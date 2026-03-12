#!/usr/bin/env bash
set -euo pipefail

# Luv K9 Asset Downloader
# Downloads all images from original luvhoboken.com Squarespace site

BASE="https://images.squarespace-cdn.com/content/v1/64c2c49137b73a46867ea31a"
OUT="public/images"

mkdir -p "$OUT"/{brand,founders,team/luvk9,team/luvkuts,dogs,events,graphics,specials}

download() {
  local url="$1" dest="$2"
  if [ -f "$dest" ]; then
    echo "  SKIP $dest (exists)"
    return
  fi
  echo "  GET  $dest"
  curl -sL "$url" -o "$dest"
}

echo "=== Brand ==="
download "$BASE/fd75c1e7-c23c-4084-8d53-3e5d001fd039/Adobe+Express+-+file.png" "$OUT/brand/logo-combined.png"
download "$BASE/411795eb-785b-4963-bb10-e2b7f9a213e3/unnamed+%286%29.png" "$OUT/brand/logo-mobile.png"

echo "=== Founders ==="
download "$BASE/a58dda53-3534-4b83-940c-54d605358f65/IMG_1105-3.jpg" "$OUT/founders/luis-nyomie-storefront.jpg"
download "$BASE/4e457ea5-64b7-4e10-ad0a-bfd3e0d606e4/IMG_1105.jpeg" "$OUT/founders/luis-nyomie-dogs.jpg"

echo "=== Team: Luv K9 ==="
download "$BASE/5409526a-f0b7-4b71-967d-ec1fb1bad081/IMG_1453-2.jpg" "$OUT/team/luvk9/nyomie-perez.jpg"
download "$BASE/8f60d1d1-85d2-4868-b3c0-6d797a54cbb7/Screen+Shot+2023-07-31+at+11.01.53+PM.png" "$OUT/team/luvk9/luis-perez.png"
download "$BASE/e159ec84-289d-4cfc-890f-93611a2c294b/IMG_8256.jpeg" "$OUT/team/luvk9/joe-maneria.jpg"
download "$BASE/5b17eac4-385f-4f39-8a79-8b26b2f79274/IMG_8177.jpeg" "$OUT/team/luvk9/elliott-nager.jpg"
download "$BASE/565956fc-d57b-4a3f-8685-614d3656603b/FullSizeRender+%283%29.jpeg" "$OUT/team/luvk9/connor-mcintyre.jpg"
download "$BASE/dd5112bb-7cdf-4e82-b634-fa1ce7eec2c3/IMG_0018.jpeg" "$OUT/team/luvk9/javier-roldan-perez.jpg"
download "$BASE/4ebe6920-d9ea-4c52-8813-f039172ba8c5/IMG_8255.jpeg" "$OUT/team/luvk9/jr-nieves.jpg"

echo "=== Team: Luv Kuts ==="
download "$BASE/e63fe9da-52dd-4431-a933-2d399ee0a0b7/FullSizeRender.jpeg" "$OUT/team/luvkuts/elizabeth-rodriguez.jpg"
download "$BASE/9fcea04a-3fb9-4e66-8196-f15d871083c5/FullSizeRender+%282%29.jpeg" "$OUT/team/luvkuts/dennis-vazquez.jpg"
download "$BASE/4012e9a6-3259-4549-b933-189b5e0ef745/FullSizeRender+%281%29.jpeg" "$OUT/team/luvkuts/evelyne-przezdziecki.jpg"

echo "=== Dogs ==="
download "$BASE/ca3348ee-5841-493d-afba-688e5be7f96d/TONY.jpeg" "$OUT/dogs/tony.jpg"
download "$BASE/e45da131-919e-4c82-a883-6a4c71f7baea/MIA.jpeg" "$OUT/dogs/mia.jpg"
download "$BASE/bac017e9-139c-4657-aa6e-ead822665c01/THOMAS.jpeg" "$OUT/dogs/thomas.jpg"
download "$BASE/4e1fbcca-1a15-4ae6-92e3-542fa01de4ca/remy.jpeg" "$OUT/dogs/remy.jpg"
download "$BASE/329a09d7-d921-4122-80ce-7339c48ef20f/tessa.jpeg" "$OUT/dogs/tessa.jpg"
download "$BASE/d5cf4873-74a8-4153-b4e1-a271b4469f34/ELPHIE.jpeg" "$OUT/dogs/elphie.jpg"
download "$BASE/db29b91f-616d-4aa2-ad5b-efc1d75e6e3c/image3.jpg" "$OUT/dogs/dog-unnamed-1.jpg"
download "$BASE/b52e6a8e-4f64-4ebc-bf80-fcf43f7e22f5/tempImageLKGM4Q.jpg" "$OUT/dogs/dog-unnamed-2.jpg"

echo "=== Events ==="
download "$BASE/66fd385d-a423-4893-b965-7231bde2f80d/image0.jpeg" "$OUT/events/asbury-1.jpg"
download "$BASE/78fc7dfb-574e-4b4b-a7af-cecbebc422c0/image1.jpeg" "$OUT/events/asbury-2.jpg"
download "$BASE/019678d9-f2ca-4d93-b5e1-824a85ee11d7/Screen+Shot+2023-07-31+at+6.42.37+PM.png" "$OUT/events/asbury-3.png"
download "$BASE/858bfa31-9c1a-4112-a87d-a0058d02a6a6/image3.jpeg" "$OUT/events/asbury-4.jpg"
download "$BASE/3371687c-184e-43f6-8e5b-bf60703786c9/image4.jpeg" "$OUT/events/asbury-5.jpg"
download "$BASE/6603ad7a-f768-4135-b1de-4f6f37ab014d/image5.jpeg" "$OUT/events/asbury-6.jpg"
download "$BASE/f428ca28-d385-409b-b93c-17cd4fa5a61c/Screen+Shot+2023-07-31+at+6.55.57+PM.png" "$OUT/events/asbury-7.png"

echo "=== Graphics ==="
download "$BASE/a29314ed-344b-494f-ae31-7499787df75d/LuvKut.png" "$OUT/graphics/luvkuts-logo.png"
download "$BASE/70d238b5-3a41-4178-9bdc-b59b7d5e1743/Brown+and+Pink+Cute+Illustrative+Pet+Grooming+Price+List.png.png" "$OUT/graphics/grooming-price-list.png"
download "$BASE/3c23158c-d4f5-4aeb-9b31-bdaa8ea2321c/Trendy+Y2K+Affirmation+Lucky+Gradient+Heart+Quote+Poster+%281%29.png" "$OUT/graphics/express-grooming-poster.png"
download "$BASE/3c4b6636-03cb-4af3-97b2-29383f6e6c7c/Purple+Orange+Modern+Dog+Walker+Poster+%283%29.png" "$OUT/graphics/playcare-poster.png"
download "$BASE/8b8a65bc-cbeb-45d3-8ac5-41d19ce4708a/Green+Retro+Store+Hours+Flyer.png" "$OUT/graphics/store-hours.png"
download "$BASE/ec8834b3-c654-43c0-b4f8-9a01818372b3/Red+and+Brown+Illustrated+Pet+Salon+Price+List+Poster.png" "$OUT/graphics/playcare-price-list.png"
download "$BASE/3e6a2c04-d17e-4c9f-be6d-3df388d8c107/877416a9-ecd4-4526-b80b-3f18033abf02.png" "$OUT/graphics/footer-graphic.png"

echo "=== Specials ==="
download "$BASE/6a77abc8-719c-4b96-aea8-f3189a0849b2/Pink+And+Brown+Playful+Professional+Dog+Grooming+Flyer+.png" "$OUT/specials/winter-warmup.png"

echo ""
echo "Done! Downloaded to $OUT/"
find "$OUT" -type f | wc -l | xargs -I{} echo "{} files total"
