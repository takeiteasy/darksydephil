#!/usr/bin/env ruby
require "json"
require "twitter"
require "net/http"

month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
month_days  = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
sub_money   = { "Prime" => 2.5,
                "1000"  => 2.5,
                "2000"  => 6.66,
                "3000"  => 17.5 }

def is_leap y
  y % 4 == 0 && (y % 100 != 0 || y % 400 == 0)
end

def date_suffix n
  if (11..13).include? n.to_i.abs % 100
    "th"
  else
    case n.to_i.abs % 10
    when 1 then "st"
    when 2 then "nd"
    when 3 then "rd"
    else        "th"
    end
  end
end

now = Time.now
#last_month = month_names[(now.month == 12 ? 1 : now.month) - 1]
last_month = "August" # TODO: Change back
data, users, paypigs, last_month_paypigs = {}, {}, {}, {}
2016.upto now.year do |year|
  data[year] = {}
  0.upto 11 do |month_n|
    month = month_names[month_n]
    data[year][month] = {}
    1.upto (month_n == 1 ? (is_leap(year) ? 29 : 28) : month_days[month_n]) do |day|
      fh_p = "./logs/#{year}/#{month}/#{year}-#{(month_n + 1).to_s.rjust(2, "0")}-#{day.to_s.rjust(2, "0")}.txt"
      if File.exists? fh_p
        data[year][month][day] = { "permabans" => 0,
                                   "bans"      => 0,
                                   "bits"      => 0,
                                   "subs"      => 0 }
        File.open fh_p, 'r' do |fh|
          while line = fh.gets
            unless year == 2016
              next unless line[0] == '@'

              /^@(?<params>[a-zA-Z-]+=\S*)\s?:((?<user>\S+!\S+@\S+)\.)?tmi\.twitch\.tv (?<type>\S+) #\S+( :(?<msg>.*))?$/ =~ line
              unless $~.nil?
                params = params.split(';').reject { |a| a[-1] == '=' }.map { |b| b.split '=' }.to_h
                user   = user.split('!')[0] unless user.nil?

                if params.has_key? "user-id"
                  users[params["user-id"]] = [] unless users.has_key? "user-id"
                  if params.has_key?("display-name") && !users[params["user-id"]].include?(params["display-name"])
                    users[params["user-id"]].push params["display-name"]
                  else
                    unless user.nil?
                      name = user.split('!')[0]
                      users[params["user-id"]].push name unless users[params["user-id"]].include? name
                    end
                  end

                  if params.has_key? "bits"
                    bits = params["bits"].to_i
                    data[year][month][day]["bits"] += bits
                    paypigs[params["user-id"]]  = 0 unless paypigs.has_key? params["user-id"]
                    paypigs[params["user-id"]] += bits
                    if year == now.year && month == last_month
                      last_month_paypigs[params["user-id"]]  = 0 unless last_month_paypigs.has_key? params["user-id"]
                      last_month_paypigs[params["user-id"]] += bits
                    end
                  elsif params.has_key? "msg-param-sub-plan"
                    data[year][month][day]["subs"] += sub_money[params["msg-param-sub-plan"]]
                  elsif params.has_key?("subscriber") && params["subscriber"] == "1" && params.has_key?("system-msg") && params["system-msg"] =~ /.*\\ssubscribed\\s/
                    data[year][month][day]["subs"] += 2.5;
                  end
                else
                  data[year][month][day][(params.has_key?("ban-duration") ? "bans" : "permabans")] += 1
                end
              end
            else
              if line =~ /^\[(\d){2}:(\d){2}\] <twitchnotify> \S+ (.*)$/
                data[year][month][day]["subs"] += 2.5
              else
                m = line.scan(/[?<=\s](?:kappa|kreygasm|swiftrage|cheer)(\d+)(?!\S)/)
                data[year][month][day]["bits"] += m.flatten(1).map(&:to_i).inject(0, :+) unless m.empty?
              end
            end
          end
        end
      end
    end
    data[year].delete(month) if data[year][month].empty?
  end
end

paypigs = paypigs.sort_by { |k, v| v }.reverse[0..30].map { |v| [users[v[0]][0], v[1]]}.to_h.to_json
last_month_paypigs = last_month_paypigs.sort_by { |k, v| v }.reverse[0..30].map { |v| [users[v[0]][0], v[1]]}.to_h.to_json

pt = /var dataJson = '(.*)'/.match(Net::HTTP.get(URI("https://graphtreon.com/creator/darksydephil")))[1]
yt = /"Date,Average Views\\n" \+ (.*) {/.match(Net::HTTP.get(URI("https://socialblade.com/youtube/user/dspgaming/monthly")))[1].scan(/(\d+-\d+-\d+,\d+)/).map { |x| x[0].split ',' }.to_h.to_json
lp = Net::HTTP.get(URI("https://www.patreon.com/darksydephil")).scan(/pledge_sum": (\d+)/)[0][0]

puts "var data = '#{data.to_json}';\nvar dataJson = '#{pt}'\nvar yt_data = '#{yt}';\nvar paypigs = '#{paypigs}';\nvar last_paypigs = '#{last_month_paypigs}';\nvar last_patreon = #{lp.to_i / 100};\nvar last_update = #{now.to_i};"

exit 0 # TODO: Remove once finished testing

year  = now.year
month = now.month
day   = now.day

if day == 1
  month = (month > 1 ? month - 1 : 12)
  year -= 1 if month == 12
  day   = (month == 2 ? (is_leap(year) ? 29 : 28) : month_days[month - 1])
else
  day -= 1
end
month = month_names[month - 1]

a, b, c, d = File.open("twitter.conf").readlines.map(&:rstrip)
client = Twitter::Streaming::Client.new do |config|
  config.consumer_key        = a
  config.consumer_secret     = b
  config.access_token        = c
  config.access_token_secret = d
end
client.update("#DSP #TheSnortReport for #{day}#{day_suffix day} #{month}, #{year}: Cheers: $#{data[year][month][day]['bits'] / 100}, Subs: $#{data[year][month][day]['subs']}")
