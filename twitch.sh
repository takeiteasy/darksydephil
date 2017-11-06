#!/usr/bin/env sh

if ! ps -ef | grep -v grep | grep twitch.rb; then
  if ruby ./gmail.rb; then
    ruby ./twitch.rb
  fi
fi
