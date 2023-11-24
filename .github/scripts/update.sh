#!/usr/bin/env bash

set -eou pipefail

(
    set -x
    sudo su -
    ls -la
    ls -la /var/www/html/
    cd /var/www/html/web-tech-group-18/
    git pull
)
