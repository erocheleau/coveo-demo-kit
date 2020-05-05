# Bump the version in sfdx-project.json before that.
sfdx force:package:version:create --path src -f config/project-scratch-def.json --package 0Ho3s000000006OCAQ --wait 10 -x

# Promote/release a package version out of beta:
# sfdx force:package:version:promote --package "Coveo Demo Kit@0.1.0-4"