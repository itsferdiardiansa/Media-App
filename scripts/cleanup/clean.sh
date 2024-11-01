#!/bin/bash

# Clean cache and unnecessary directories
rm -rf apps/**/{dist,build} packages/**/{dist,build} dist/ coverage/ .nx/**
echo "Directories have been cleaned completely!"