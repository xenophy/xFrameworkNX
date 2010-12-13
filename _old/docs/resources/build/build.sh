#!/bin/sh

IFS=$'\n'

compress_docjs() {

    echo "xFramework NX Documentation Script Build..."

    # JS Code Compress
    DestFile="$LIBDIR/docs-all.js";
    DebugDestFile="$LIBDIR/docs-all-debug.js";

    if [ -e "$DestFile" ];then
        rm -f "$DestFile"
    fi
    if [ -e "$DebugDestFile" ];then
        rm -f "$DebugDestFile"
    fi

    compress_cmd="java -jar $CONSOLE/compiler.jar --compilation_level WHITESPACE_ONLY"

    file=(`cat "$CONSOLE/js.list"`)
    ln=0
    for line in "${file[@]}"; do
        compress_cmd=$compress_cmd" --js=$LIBDIR/$line"
        cat $LIBDIR/$line >> $DebugDestFile
    done

    compress_cmd=$compress_cmd" --js_output_file=$DestFile"

    eval $compress_cmd

}
help(){
    echo "usage: $CONSOLE/`basename $0` [-h]"
    echo " -h   : display this usage."
    echo " none : compress js."
    cd $CD
    exit 1
}

### main
CD=`pwd`
CONSOLE=$(cd $(dirname $0) && pwd)
LIBDIR=`dirname $CONSOLE`"/.."
cd $CONSOLE

while getopts cjh opt
do
    case "$opt" in
    *)
        help;;
    esac
done

### options is undef
if [ -z "$1" ];then
    compress_docjs
fi

### back to current dir
cd $CD

