#!/usr/bin/env nix-shell
#!nix-shell -i bash -p imagemagick

for size in 512 192 48 32 16; do
  magick src/assets/favicon-64.png -sample "${size}x${size}" public/favicon-${size}.png
done
magick src/assets/favicon-64.png -sample 180x180 public/apple-touch-icon.png

magick public/favicon-{48,32,16}.png public/favicon.ico
rm public/favicon-{16,48}.png
