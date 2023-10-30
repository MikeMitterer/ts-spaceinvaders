#!/usr/bin/env bash
# shellcheck disable=SC2034

#------------------------------------------------------------------------------
# Config for updateDevTemplates.sh
# created by updateDevTemplates.sh on Mi 25 Okt 2023 17:12:39 CEST
#------------------------------------------------------------------------------

# Folder mit den Templates
# BASE_FOLDER="."
# BASE_FOLDER="${DEV_LOCAL}/Templates/Production"

# Names des Template-Folders
# TEMPLATE_FOLDER="_Default"

# Files die umbenannt werden müssen -------------------------------------------
# FILES_TO_RENAME["vue.config.cjs"]="${BACKUP_FOLDER}/vue.config.cjs"
# FILES_TO_RENAME["vue.config.js"]="vue.config.cjs"

# Files die gelöscht werden ---------------------------------------------------
# FILES_TO_REMOVE+=("tslint.json")

# Files die kopiert werden -----------------------------------------------------
# Der "Key" ist das Source-File und der "Value" ist das Remote-File
# FILES_TO_COPY["static/config.lenovo.js"]="config.js"
# FILES_TO_COPY["static/config.lenovo.js"]=""

# Scripts ---------------------------------------------------------------------
# Stellt die Filenamen auf .cjs um
# SCRIPT_TO_COPY["setup/vue2vite.sh"]="vue2vite.sh"

# Updates ---------------------------------------------------------------------
# Die Files werden nur kopiert wenn sie noch nicht existieren
# FILES_TO_UPDATE["webpack.web.local.js"]=""

# Wird mit
#     echo "MikeMitterer" > .gitorg
#     echo "mmit-MobiAd" > .gitorg
#     echo "mmit-WZE" > .gitorg
#     echo "MangoLila" > .gitorg
# erstellt.
# Default ist GH_ORG_MM
FILES_TO_UPDATE[".gitorg.mm"]=".gitorg"
# FILES_TO_UPDATE[".gitorg.mobiad"]=".gitorg"


