// data/images.js — extracted from index.html (v73 step1)
// Original locations: TITLE_IMAGE @ 4133, CHAR_IMAGES @ 4135-4148, SCENE_IMAGES @ 4153-4170

const TITLE_IMAGE = 'assets/img/images/title_image.webp';

const CHAR_IMAGES = {
  haru: 'assets/img/chars/haru.webp',
  rio: 'assets/img/chars/rio.webp',
  mina: 'assets/img/images/char_images_mina.webp',
  yamada: 'assets/img/images/char_images_yamada.webp',
  mori: 'assets/img/images/char_images_mori.webp',
  mystery: 'assets/img/images/char_images_mystery.webp',
  ojiisan: 'assets/img/images/char_images_ojiisan.webp',
  tanaka: 'assets/img/images/char_images_tanaka.webp',
  villager1: 'assets/img/images/char_images_villager1.webp',
  villager2: 'assets/img/images/char_images_villager2.webp',
  villager3: 'assets/img/images/char_images_villager3.webp',
  villager4: 'assets/img/images/char_images_villager4.webp',
};

const SCENE_IMAGES = {
  schoolGate: 'assets/img/images/scene_images_schoolgate.webp',
  library: 'assets/img/images/scene_images_library.webp',
  artRoom: 'assets/img/images/scene_images_artroom.webp',
  warehouse: 'assets/img/images/scene_images_warehouse.webp',
  park: 'assets/img/images/scene_images_park.webp',
  museum: 'assets/img/images/scene_images_museum.webp',
  trainStation: 'assets/img/images/scene_images_trainstation.webp',
  garden: 'assets/img/images/scene_images_garden.webp',
  hospital: 'assets/img/images/scene_images_hospital.webp',
  shrine: 'assets/img/images/scene_images_shrine.webp',
  home: 'assets/img/images/scene_images_home.webp',
  shoppingMall: 'assets/img/images/scene_images_shoppingmall.webp',
  rooftop: 'assets/img/images/scene_images_rooftop.webp',
  cafe: 'assets/img/images/scene_images_cafe.webp',
  gardenTanabata: 'assets/img/images/scene_images_gardentanabata.webp',
  nightStreet: 'assets/img/images/scene_images_nightstreet.webp',
};

// === Series 4 Assets (2026-05-10): characters + backgrounds ===
// External PNG references — coexist with base64 entries above.
// SCIENTISTS_STORY (data/series4-scientists.js) consumes these keys.

// Main characters (also usable across other series)
CHAR_IMAGES.hinata          = 'assets/img/chars/hinata.webp';
CHAR_IMAGES.penta           = 'assets/img/chars/penta.webp';

// Series 4 ペンタ variant (worn only inside series 4 via SCIENTISTS_CHARS override)
CHAR_IMAGES.penta_series04  = 'assets/img/chars/penta_series04.webp';

// Series 4 NPC scientists (10)
CHAR_IMAGES.ringo_hakase      = 'assets/img/chars/series04/ringo_hakase.webp';
CHAR_IMAGES.shiraga_ein       = 'assets/img/chars/series04/shiraga_ein.webp';
CHAR_IMAGES.hikari_curie      = 'assets/img/chars/series04/hikari_curie.webp';
CHAR_IMAGES.darwin_voyager    = 'assets/img/chars/series04/darwin_voyager.webp';
CHAR_IMAGES.pasteur_micro     = 'assets/img/chars/series04/pasteur_micro.webp';
CHAR_IMAGES.mendel_pea        = 'assets/img/chars/series04/mendel_pea.webp';
CHAR_IMAGES.galileo_telescope = 'assets/img/chars/series04/galileo_telescope.webp';
CHAR_IMAGES.faraday_coil      = 'assets/img/chars/series04/faraday_coil.webp';
CHAR_IMAGES.bohr_atom         = 'assets/img/chars/series04/bohr_atom.webp';
CHAR_IMAGES.togo_kenja        = 'assets/img/chars/series04/togo_kenja.webp';

// Series 4 backgrounds (11: main study + 10 chapter scenes)
SCENE_IMAGES.bg_main_study        = 'assets/img/bg/series04/bg_main_study.webp';
SCENE_IMAGES.bg_ch01_apple        = 'assets/img/bg/series04/bg_ch01_apple.webp';
SCENE_IMAGES.bg_ch02_blackboard   = 'assets/img/bg/series04/bg_ch02_blackboard.webp';
SCENE_IMAGES.bg_ch03_radium       = 'assets/img/bg/series04/bg_ch03_radium.webp';
SCENE_IMAGES.bg_ch04_beagle       = 'assets/img/bg/series04/bg_ch04_beagle.webp';
SCENE_IMAGES.bg_ch05_microbiology = 'assets/img/bg/series04/bg_ch05_microbiology.webp';
SCENE_IMAGES.bg_ch06_monastery    = 'assets/img/bg/series04/bg_ch06_monastery.webp';
SCENE_IMAGES.bg_ch07_observatory  = 'assets/img/bg/series04/bg_ch07_observatory.webp';
SCENE_IMAGES.bg_ch08_electricity  = 'assets/img/bg/series04/bg_ch08_electricity.webp';
SCENE_IMAGES.bg_ch09_physics      = 'assets/img/bg/series04/bg_ch09_physics.webp';
SCENE_IMAGES.bg_ch10_boss         = 'assets/img/bg/series04/bg_ch10_boss.webp';
