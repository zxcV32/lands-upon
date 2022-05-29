#!/bin/bash
#
# order - rename files sequentially

# npm i @ayoisaiah/f2 -g is needed to use this script

f2 -x -r '{{x.dt.MMM}}-{{x.dt.DD}}-{{x.dt.YYYY}}-{{x.dt.hh}}-{{x.dt.mm}}-{{x.dt.ss}}-{{x.dt.A}}{{ext}}' -E 'json' $1