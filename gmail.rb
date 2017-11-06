#!/usr/bin/env ruby
require 'gmail'

login, password = File.open('gmail.conf').readlines.map(&:rstrip)
Gmail.connect login, password do |gmail|
  gmail.inbox.find(:unread, from: 'no-reply@twitch.tv').each do |email|
    next unless email.message.subject == 'darksydephil just went live on Twitch'
    email.read!
    exit 0
  end
end
exit 1
