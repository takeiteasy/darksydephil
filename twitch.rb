#!/usr/bin/env ruby
require "socket"
require "timeout"
require "FileUtils"
require "gmail"
require "thread"

# Extend IO to readlines without blocking
class IO
	def gets_nonblock
		@rlnb_buffer ||= ""
		ch = nil
		while ch = self.read_nonblock(1)
      @rlnb_buffer += ch
			if @rlnb_buffer[-1].ord == 10 && @rlnb_buffer[-2].ord == 13
				res  = @rlnb_buffer[0..-3]
				@rlnb_buffer = ""
				return res
			end
		end
	end
end

# Class to emit events
module Emitter
	def callbacks
		@callbacks ||= Hash.new { |h, k| h[k] = [] }
	end

	def on type, &block
		callbacks[type] << block
		self
	end

	def emit type, *args
		callbacks[type].each do |block|
			block.call(*args)
		end
	end
end

# Class to handle IRC stream and emit events
class Stream
	include Emitter
	attr_accessor :io, :buf

	def initialize serv, port
		@buf = []
		Timeout.timeout(5) do
		  @io = TCPSocket.new serv, port
		end
	rescue SocketError => e
		puts "ERROR! Failed to connect to #{serv}! #{e.message}"
		self.disconnect
	rescue Timeout::Error
		puts "ERROR! Connection to #{serv} timed out!"
		self.disconnect
	end

	def disconnect
		@io.puts 'QUIT'
		@io.close
	rescue Errno::EPIPE
	end

	def << data
		@buf << data
	end

	def write
		@buf.each do |x|
			@io.puts x
			emit :WROTE, x
		end
		@buf = []
	rescue EOFError, Errno::ECONNRESET
		emit :CLOSED
	end

	def read
		read = @io.gets_nonblock
		emit :READ, read
	rescue IO::WaitReadable
		emit :WAITING
	rescue EOFError, Errno::ECONNRESET
		emit :CLOSED
	end
end

# Class to handle IRC stream
class Bot
	attr_reader :stream

	def initialize stream
		@stream = stream
		@stream.on :CLOSED do
      stop
      @steam.disconnect
    end
	end

	def start
		@running = true
		tick while @running
	end

	def stop
		@running = false
	end

	def tick
		@stream.read
		@stream.write
		sleep 0.001
	end
end

bot  = nil
user = "justinfan" + (0...10).map { ('0'..'9').to_a[rand(10)] }.join
chan = "darksydephil"
out  = "./logs/%Y/%B/%Y-%m-%d.txt"
fh   = nil
fh_p = ""
tz   = "-07:00"
login, password = File.open('gmail.conf').readlines.map(&:rstrip)

begin
  Gmail.connect login, password do |gmail|
    gmail.inbox.find(:unread, :from => "no-reply@twitch.tv").each do |email|
      if email.message.subject == "darksydephil just went live on Twitch"
        email.read!

        sock = Stream.new "irc.chat.twitch.tv", 6667
        bot  = Bot.new sock

        sock << "USER #{user} 0 0 :#{user}"
        sock << "NICK #{user}"
        sock << "CAP REQ :twitch.tv/membership"
        sock << "CAP REQ :twitch.tv/tags"
        sock << "CAP REQ :twitch.tv/commands"
        sock << "JOIN ##{chan}"

				last_msg, timeout = Time.now, 900
				Thread.new do
					loop do
						bot.stop if Time.now - last_msg > timeout
						sleep 0.001
					end
				end

        sock.on :READ do |data|
          if data.start_with? "PING"
            data[1] = 'O'
            sock << data
          else
            time = Time.now.getlocal(tz)
						last_msg = Time.now
            path = time.strftime out
            unless path == fh_p
              fh_p = path
              fh.close unless fh.nil?
              fh_p_dn = File.dirname fh_p
              FileUtils.mkdir_p fh_p_dn unless File.directory? fh_p_dn
              fh = File.open fh_p, "a+"
            end
            fh.write data + "\n"
            bot.stop if data.start_with? "@msg-id=host_on"
          end
        end

        bot.start
      end
    end
  end
rescue SystemExit, Interrupt
	bot.stop unless bot.nil?
rescue EOFError, Exception
ensure
  fh.close unless fh.nil?
end
