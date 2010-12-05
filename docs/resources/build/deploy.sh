#!/bin/sh

if [ -e "/tmp/xFrameworkNXDoc" ];then
    rm -f "/tmp/xFrameworkNXDoc"
fi

mkdir /tmp/xFrameworkNXDoc;

cp -Rf ./* /tmp/xFrameworkNXDoc/;

git checkout gh-pages;









