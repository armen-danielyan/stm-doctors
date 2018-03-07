# http_path = "/"
# css_dir = "css"
# sass_dir = "sass"
# images_dir = "images"
# javascripts_dir = "js"
# fonts_dir = "fonts"
# output_style = :compressed

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass

# Compass CSS framework config file

require 'susy'
require 'modular-scale'
require 'sassy-buttons'
require 'breakpoint'
require 'compass-css-arrow'
require 'rgbapng'
# Require any additional compass plugins here.

project_type = :stand_alone
# Set this to the root of your project when deployed:
http_path = "/"
sass_dir = "sass"
css_dir = "static/css"
images_dir = "static/images"
fonts_dir = "static/fonts"
javascripts_dir = "static/js"
line_comments = false
preferred_syntax = :scss
output_style = :expanded
relative_assets = true