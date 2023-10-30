#!/usr/bin/env bash
#' ------------------------------------------------------------------------------
#" Das Script stellt von VUE auf VITE um.
#' ------------------------------------------------------------------------------

# DEV_LOCAL muss in .bashrc gesetzt werden. ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
if [ -z ${DEV_BASH+x} ]; then echo "Var 'DEV_BASH' nicht gesetzt!"; exit 1; fi
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# Abbruch bei Problemen (https://goo.gl/hEEJCj)
#
# Wenn ein Fehler nicht automatisch zu einem exit führen soll dann
# kann 'command || true' verwendet werden
#
# Für die $1, $2 Abfragen kann 'CMDLINE=${1:-}' verwendet werden
#
# -e Any subsequent(*) commands which fail will cause the shell script to exit immediately
# -o pipefail sets the exit code of a pipeline to that of the rightmost command
# -u treat unset variables as an error and exit
# -x print each command before executing it
# set -eou pipefail

#------------------------------------------------------------------------------
# Einbinden der globalen Libs
#   Hier sind z.B. Farben, generell globale VARs und Funktionen definiert
#

if [[ "${__TOOLS_LIB__:=""}" == "" ]]; then . "${DEV_BASH}/tools.lib.sh"; fi
if [[ "${__APPS_LIB__:=""}" == "" ]]; then . "${DEV_BASH}/apps.lib.sh"; fi

#------------------------------------------------------------------------------
# BASIS
readonly SCRIPT_NAME="$(basename "$0")"
readonly SCRIPT=$(realpath "$0")
readonly SCRIPT_PATH=$(dirname "${SCRIPT}")

readonly SCRIPT_DOC=$(scriptToDoc "${SCRIPT}")

readonly MD5_FILE="${SCRIPT_PATH}/.${SCRIPT_NAME}.md5"

readonly MD5=$(md5 -q "${SCRIPT}")
readonly PREV_MD5=$(cat "${MD5_FILE}" 2>>/dev/null)

readonly HAS_CHANGED=$([[ "${MD5}" != "${PREV_MD5}" ]] && echo "true" || echo "false")
echo "${MD5}" > "${MD5_FILE}"

# echo "MD5: '${MD5}'"
# echo "PREV_MD5: '${PREV_MD5}'"
# echo "HAS_CHANGED: '${HAS_CHANGED}'"

if [[ -f "package.json" ]]; then
  readonly PACKAGE_NAME=$(jq -r -j '.name' package.json)
else
  readonly PACKAGE_NAME=""
fi

readonly TEMPLATE_FOLDER="${DEV_LOCAL}/Templates/Production/TypeScript"

readonly PACKAGE_FOLDER="package"
#readonly SCRIPT_SECTION="scripts-wp_env.json"
readonly SCRIPT_SECTION="scripts-vite_env.json"
readonly SCRIPT_SECTION_FILE="${TEMPLATE_FOLDER}/${PACKAGE_FOLDER}/${SCRIPT_SECTION}"

readonly DEFAULT_JENKINS_BUILD="build.jenkins"
readonly DEFAULT_JENKINS_BUILD_FILE="${TEMPLATE_FOLDER}/${DEFAULT_JENKINS_BUILD}"

# readonly EDITOR="fleet"
readonly EDITOR="subl"

# CMDLINE kann ab hier verwendet werden ---------------------------------------
readonly CMDLINE=${1:-}
readonly OPTION=${2:-""}

#------------------------------------------------------------------------------
# Functions
#
isPackageInstalled() {
  local _PACKAGE_NAME="$1"

  local _DEPENDENCIES=$(yarn info --name-only --json "${_PACKAGE_NAME}" | jq -r 2>>/dev/null)
#  local _DEPENDENCIES=$(jq -r -j ".dependencies.${_PACKAGE_NAME}" package.json 2>>/dev/null)
#  local _DEV_DEPENDENCIES=$(jq -r -j ".devDependencies.${_PACKAGE_NAME}" package.json 2>>/dev/null)

#  echo "_DEPENDENCIES: '${_DEPENDENCIES}'"
#  echo "_DEV_DEPENDENCIES: '${_DEV_DEPENDENCIES}'"

  if [[ ("${_DEPENDENCIES}" == "" && "${_DEV_DEPENDENCIES}" == "") || (${_DEPENDENCIES} == "null" && "${_DEV_DEPENDENCIES}" == "null") ]]; then
    echo -n "false"
  else
    echo -n "true"
  fi
}


readonly IS_DATE_FNS_INSTALLED=$(isPackageInstalled "date-fns")

removePackages() {
  yarn remove @babel/plugin-proposal-class-properties
  yarn remove @babel/plugin-proposal-nullish-coalescing-operator
  yarn remove @babel/plugin-proposal-object-rest-spread
  yarn remove @babel/plugin-proposal-optional-chaining
  yarn remove @types/babel__plugin-transform-runtime
  yarn remove @tailwindcss/postcss7-compat
  yarn remove @types/eslint
  yarn remove @vue/cli-plugin-babel
  yarn remove @vue/cli-plugin-typescript
  yarn remove @vue/cli-plugin-unit-jest
  yarn remove @vue/cli-service
  yarn remove vue-cli-plugin-vuetify
  yarn remove babel-core
  yarn remove babel-loader
  yarn remove postcss-loader
  yarn remove sass-loader
  yarn remove tslint-consistent-codestyle
  yarn remove vue-jest
  yarn remove webpack
  yarn remove workbox-webpack-plugin
  yarn remove node-polyfill-webpack-plugin
  yarn remove vuetify-loader
  yarn remove yorkie
  yarn remove @types/websocket
  yarn remove jest-transform-stub

  if [[ "${PACKAGE_NAME}" != "@mmit/styles" ]];then
    yarn remove postcss
    yarn remove postcss-cli
    yarn remove autoprefixer
  fi
}


addPackages() {
    # Dependencies
    [[ "$(isPackageInstalled "vue")" == "false" ]] && yarn add -D vue@2.7
    [[ "$(isPackageInstalled "vue-demi")" == "false" ]] && yarn add -D vue-demi@0.14.6

    # DevDependencies
    [[ "$(isPackageInstalled "@babel/core")" == "false" ]] && yarn add -D @babel/core@7.22.11
    [[ "$(isPackageInstalled "@babel/plugin-transform-runtime")" == "false" ]] && yarn add -D @babel/plugin-transform-runtime
    [[ "$(isPackageInstalled "@babel/preset-env")" == "false" ]] && yarn add -D @babel/preset-env@7.22.10
    [[ "$(isPackageInstalled "@babel/preset-typescript")" == "false" ]] && yarn add -D @babel/preset-typescript@7.22.11
    [[ "$(isPackageInstalled "@babel/runtime")" == "false" ]] && yarn add -D @babel/runtime@7.22.15
    [[ "$(isPackageInstalled "date-fns")" == "false" ]] && yarn add -D date-fns@2.23.0
    [[ "$(isPackageInstalled "@typescript-eslint/eslint-plugin")" == "false" ]] && yarn add -D @typescript-eslint/eslint-plugin@6.7.4
    [[ "$(isPackageInstalled "@typescript-eslint/parser")" == "false" ]] && yarn add -D @typescript-eslint/parser@6.7.4
    [[ "$(isPackageInstalled "@vitejs/plugin-vue2")" == "false" ]] && yarn add -D @vitejs/plugin-vue2@2.2.0
    [[ "$(isPackageInstalled "@vue/test-utils@1")" == "false" ]] && yarn add -D @vue/test-utils@1
    [[ "$(isPackageInstalled "@vue/vue2-jest")" == "false" ]] && yarn add -D @vue/vue2-jest@29.2.4
    [[ "$(isPackageInstalled "babel-jest")" == "false" ]] && yarn add -D babel-jest@29.7.0
    [[ "$(isPackageInstalled "babel-plugin-transform-inline-environment-variables")" == "false" ]] && yarn add -D babel-plugin-transform-inline-environment-variables@^0.4.3
    [[ "$(isPackageInstalled "eslint-plugin-vue")" == "false" ]] && yarn add -D eslint-plugin-vue@9.17.0
    [[ "$(isPackageInstalled "eslint@8")" == "false" ]] && yarn add -D eslint@8
    [[ "$(isPackageInstalled "vue-eslint-parser")" == "false" ]] && yarn add -D vue-eslint-parser@9.3.2
    [[ "$(isPackageInstalled "jest-environment-jsdom")" == "false" ]] && yarn add -D jest-environment-jsdom@29.7.0
    [[ "$(isPackageInstalled "jest-environment-node")" == "false" ]] && yarn add -D jest-environment-node@29.7.0
    [[ "$(isPackageInstalled "jest-extended")" == "false" ]] && yarn add -D jest-extended@2.0.0
    [[ "$(isPackageInstalled "jest")" == "false" ]] && yarn add -D jest@29.7.0
    [[ "$(isPackageInstalled "keycloak-js")" == "false" ]] && yarn add -D keycloak-js@15.0.1
    [[ "$(isPackageInstalled "ts-jest@^29.1.1")" == "false" ]] && yarn add -D ts-jest@^29.1.1
    [[ "$(isPackageInstalled "tslib@^2.6.2")" == "false" ]] && yarn add -D tslib@^2.6.2
    [[ "$(isPackageInstalled "typescript")" == "false" ]] && yarn add -D typescript@5.2.2
    [[ "$(isPackageInstalled "vite-plugin-ejs")" == "false" ]] && yarn add -D vite-plugin-ejs@1.6.4
    [[ "$(isPackageInstalled "vite-plugin-node-polyfills")" == "false" ]] && yarn add -D vite-plugin-node-polyfills@0.15.0
    [[ "$(isPackageInstalled "vite-plugin-pwa")" == "false" ]] && yarn add -D vite-plugin-pwa@0.16.5
    [[ "$(isPackageInstalled "vite")" == "false" ]] && yarn add -D vite@4.4.9
    [[ "$(isPackageInstalled "vue-template-compiler@2.7")" == "false" ]] && yarn add -D vue-template-compiler@2.7
    [[ "$(isPackageInstalled "vue-tsc")" == "false" ]] && yarn add -D vue-tsc@1.8.15
    [[ "$(isPackageInstalled "vuetify2-component-types")" == "false" ]] && yarn add -D vuetify2-component-types@2

    # Nur für Libs... (z.B. components)
    # resolve-tspaths@0.8.16  \

}

changeFiles() {
  if [[ -f "public/index.html" ]]; then
    mv public/index.html .
  fi

  # Vite importiert anders als WebPack
  echo
  sed -i ".bak" -e 's/@import "~/@import "/g' src/assets/styles/main.scss
}

showInfos() {
  echo
  echo "Händisch:"
  echo
  echo "'<script type=\"module\" src=\"src/main.ts\"></script>' bei index.html einfügen..."
  echo
  echo "Check ob tsconfig.json wirklich nur die 'extends' Zeile enthält"
  echo "    - evtl. löschen  und ein 'updateDevTemplates.sh -u' ausführen"
  echo
  echo "In packages:"
  echo "    '  \"type\": \"module\",' einfügen"
  echo "    version"
  echo "    clean"
  echo "    test"
  echo "    build"
  echo "updaten"
  echo
  echo "Soll 'yarn add -D resolve-tspaths@0.8.16' installiert werden? (Nur für Libs...)"
  echo
  echo "Bei Jenkins:"
  echo "    .jenkins die Variablen updaten"
  echo "    build.jenkins - Die Möglichkeit schaffen, die Tests auszuschalten"
  echo "    build.jenkins - Lint einstweilen ausschalten"
  echo
}

clean() {
  # Script löscht sich selbst
  rm -f ./vue2vite.sh
}

showScriptsSection() {
  "${EDITOR}" "${SCRIPT_SECTION_FILE}"
}

showJenkinsBuild() {
  "${EDITOR}" "${DEFAULT_JENKINS_BUILD_FILE}"
}

#------------------------------------------------------------------------------
# Options
#

usage() {
    echo
    [[ ${SCRIPT_DOC:-""} != "" ]] && echo -e "${SCRIPT_DOC}"
    echo
    echo "Usage: ${SCRIPT_NAME} [ options ]"
    echo
    usageLine "-h | --help            " "Help"
    usageLine "-i                     " "Show infos"
    echo
    usageLine "-x                     " "Run all commands (remove, add, change)"
    echo
    usageLine "-r                     " "Remove packages"
    usageLine "-a                     " "Add packages"
    usageLine "-c                     " "Change files"
    echo
    usageLine "-ss | -sp              " "Show default Scripts-Section (${YELLOW}${PACKAGE_FOLDER}/${SCRIPT_SECTION}${NC})"
    usageLine "-sj                    " "Show default Jenkins-Build (${YELLOW}${DEFAULT_JENKINS_BUILD}${NC})"
    echo
    usageLine "--clean                " "Clean"
    echo
#    echo -e "${BLUE}Hints:${NC}"
#    echo
}

case "$CMDLINE" in
    -x)
        removePackages
        addPackages
        changeFiles
        showInfos
    ;;

    -r)
        removePackages
    ;;

    -a)
        addPackages
    ;;

    -c)
        changeFiles
    ;;

    -ss|-sp)
        showScriptsSection
    ;;

    -sj)
        showJenkinsBuild
    ;;

    -i)
        showInfos
    ;;

    -h|-help|--help|*)
        usage
    ;;

esac

#------------------------------------------------------------------------------
# Alles OK...

exit 0
