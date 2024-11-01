#!/bin/bash
set -e

# Directories for individual coverage reports
APPS_COVERAGE="coverage/apps"
PACKAGES_COVERAGE="coverage/packages"
COMBINED_COVERAGE="coverage/merged-coverage.json"
TEMP_COVERAGE="coverage/temp"

# Clear previous coverage reports
rm -rf "$APPS_COVERAGE" "$PACKAGES_COVERAGE" "$COMBINED_COVERAGE" "$TEMP_COVERAGE"
mkdir -p "$TEMP_COVERAGE"

# Run unit and integration tests with coverage
echo "Running unit tests with coverage..."
pnpm exec jest --coverage --coverageDirectory="$APPS_COVERAGE" --selectProjects apps --passWithNoTests || { echo "Unit tests failed. Exiting."; exit 1; }

echo "Running integration tests with coverage..."
pnpm exec jest --coverage --coverageDirectory="$PACKAGES_COVERAGE" --selectProjects packages --passWithNoTests || { echo "Integration tests failed. Exiting."; exit 1; }

# Symlink coverage files into temp directory for merging
if [[ -f "$APPS_COVERAGE/coverage-final.json" && -f "$PACKAGES_COVERAGE/coverage-final.json" ]]; then
    ln -s "$PWD/$APPS_COVERAGE/coverage-final.json" "$TEMP_COVERAGE/app-coverage.json"
    ln -s "$PWD/$PACKAGES_COVERAGE/coverage-final.json" "$TEMP_COVERAGE/packages-coverage.json"

    echo "Merging coverage reports..."
    npx nyc merge "$TEMP_COVERAGE" "$COMBINED_COVERAGE"
    echo "Combined coverage report generated at $COMBINED_COVERAGE"
else
    echo "No coverage reports found to merge."
fi