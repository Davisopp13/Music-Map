-- =============================================================
-- UPDATE 10: Location images (Wikimedia Commons / LOC, licensed)
-- Adds image_attribution column; sets image_url + attribution
-- for 30 pins. Sources verified by Manus, triaged by hand.
-- REJECTED (wrong subject, awaiting personal photos): Club Baron,
-- plus the 7 NO-IMAGE pins and Ameris.
-- House style: dollar-quoted strings.
-- =============================================================

alter table locations add column if not exists image_attribution text;

update locations set
  image_url = $q$https://upload.wikimedia.org/wikipedia/commons/4/4e/Site_of_Bristol_Sessions_Recordings_in_Bristol%2C_Tennessee_where_the_Carter_Family_and_Jimmie_Rogers_were_recorded_in_1927.jpg$q$,
  image_attribution = $q$Photo: Swampyank, CC BY-SA 4.0, via Wikimedia Commons$q$
where slug = 'bristol-sessions-site';

update locations set
  image_url = $q$https://upload.wikimedia.org/wikipedia/commons/c/ca/Birthplace_of_Country_Music_Museum_in_Bristol%2C_Virginia.jpg$q$,
  image_attribution = $q$Photo: Swampyank, CC BY-SA 4.0, via Wikimedia Commons$q$
where slug = 'birthplace-of-country-music-museum';

update locations set
  image_url = $q$https://upload.wikimedia.org/wikipedia/commons/0/0b/State_line_on_State_Street_in_Bristol_TN_VA._%282882596558%29.jpg$q$,
  image_attribution = $q$Photo: Jason Riedy, CC BY 2.0, via Wikimedia Commons$q$
where slug = 'state-street-line';

update locations set
  image_url = $q$https://upload.wikimedia.org/wikipedia/commons/d/d3/Bristol_Virginia-Tennessee_Slogan_Sign_2012-09-27_21-44-45.jpg$q$,
  image_attribution = $q$Photo: Bwheelerrtrm, CC BY-SA 3.0, via Wikimedia Commons$q$
where slug = 'bristol-sign';

update locations set
  image_url = $q$https://commons.wikimedia.org/wiki/Special:FilePath/Paramount_Theater%2C_Bristol%2C_Tennessee_LCCN2011630773.tiff?width=1600$q$,
  image_attribution = $q$Photo: Carol M. Highsmith, public domain, via Library of Congress / Wikimedia Commons$q$
where slug = 'paramount-bristol';

update locations set
  image_url = $q$https://upload.wikimedia.org/wikipedia/commons/a/ab/Tennessee_Ernie_Ford_1957.JPG$q$,
  image_attribution = $q$Tennessee Ernie Ford in 1957. Photo: NBC Television, public domain, via Wikimedia Commons$q$
where slug = 'tennessee-ernie-ford-birthplace';

update locations set
  image_url = $q$https://upload.wikimedia.org/wikipedia/commons/0/01/APs_homeplace_cabin-exterior_2_copy_%283304731233%29.jpg$q$,
  image_attribution = $q$A.P. Carter's birthplace cabin, preserved on the Fold grounds. Photo: Southern Foodways Alliance, CC BY 2.0, via Wikimedia Commons$q$
where slug = 'carter-family-fold';

update locations set
  image_url = $q$https://cdn.loc.gov/service/pnp/highsm/12500/12578v.jpg$q$,
  image_attribution = $q$Photo: Carol M. Highsmith Archive, Library of Congress, public domain$q$
where slug = 'burger-bar';

update locations set
  image_url = $q$https://upload.wikimedia.org/wikipedia/commons/c/c1/State_Street_-_Bristol%2C_TN-VA.jpg$q$,
  image_attribution = $q$State Street, the festival's footprint. Photo: AppalachianCentrist, CC BY-SA 4.0, via Wikimedia Commons$q$
where slug = 'rhythm-and-roots';

update locations set
  image_url = $q$https://upload.wikimedia.org/wikipedia/commons/5/51/Capricorn_Sound_Studios%2C_2014.jpg$q$,
  image_attribution = $q$The studio in 2014, before Mercer's restoration. Photo: Saginaw-hitchhiker, CC BY-SA 4.0, via Wikimedia Commons$q$
where slug = 'capricorn-sound-studios';

update locations set
  image_url = $q$https://upload.wikimedia.org/wikipedia/commons/2/2f/Rose_Hill_Cemetery%2C_Macon%2C_Georgia%2C_USA_1_Sept_2021_-_23.jpg$q$,
  image_attribution = $q$Photo: Infrogmation, CC BY-SA 4.0, via Wikimedia Commons$q$
where slug = 'rose-hill-cemetery';

update locations set
  image_url = $q$https://upload.wikimedia.org/wikipedia/commons/b/bd/H%26H_Restaurant_sign.jpg$q$,
  image_attribution = $q$Photo: Bubba73, CC BY-SA 3.0, via Wikimedia Commons$q$
where slug = 'h-and-h-restaurant';

update locations set
  image_url = $q$https://upload.wikimedia.org/wikipedia/commons/9/97/Douglass_Theatre%2C_Macon_July_2024.jpg$q$,
  image_attribution = $q$Photo: Thomson200, CC0, via Wikimedia Commons$q$
where slug = 'douglass-theatre';

update locations set
  image_url = $q$https://upload.wikimedia.org/wikipedia/commons/d/dc/Litte_richard_House_Macon_GA.jpg$q$,
  image_attribution = $q$Photo: Macon-Bibb County Recreation Department, CC0, via Wikimedia Commons$q$
where slug = 'little-richard-house';

update locations set
  image_url = $q$https://upload.wikimedia.org/wikipedia/commons/6/61/OtisReddingStatue.jpg$q$,
  image_attribution = $q$The statue at its original Gateway Park home, before its 2025 move to the Center for the Arts. Photo: Linda Cooley, CC BY-SA 3.0, via Wikimedia Commons$q$
where slug = 'otis-redding-statue';

update locations set
  image_url = $q$https://upload.wikimedia.org/wikipedia/commons/2/2b/City_Auditorium_Macon_Georgia_US_postcard.jpg$q$,
  image_attribution = $q$Vintage postcard, public domain$q$
where slug = 'macon-city-auditorium';

update locations set
  image_url = $q$https://commons.wikimedia.org/wiki/Special:FilePath/VIEW_OF_THEATER_INTERIOR_-_Fox_Theater%2C_Ponce_de_Leon_Avenue_and_East_Peachtree_Street%2C_Atlanta%2C_Fulton_County%2C_GA_HABS_GA%2C61-ATLA%2C2-2.tif?width=1600$q$,
  image_attribution = $q$The Moorish interior, Historic American Buildings Survey, public domain$q$
where slug = 'fox-theatre';

update locations set
  image_url = $q$https://upload.wikimedia.org/wikipedia/commons/8/8b/The_Royal_Peacock_Nightclub,_Atlanta,_GA_(47421895822).jpg$q$,
  image_attribution = $q$Photo: Warren LeMay, CC0, via Wikimedia Commons$q$
where slug = 'royal-peacock';

update locations set
  image_url = $q$https://upload.wikimedia.org/wikipedia/commons/1/10/Eddie%27s_Attic_Sign.jpg$q$,
  image_attribution = $q$Photo: CC0, via Wikimedia Commons$q$
where slug = 'eddies-attic';

update locations set
  image_url = $q$https://upload.wikimedia.org/wikipedia/commons/c/ca/Atlanta_Underground.jpg$q$,
  image_attribution = $q$The Underground Atlanta entrance, the venue's current home. Photo: Thomas Moeller, CC BY 2.0, via Wikimedia Commons$q$
where slug = 'the-masquerade';

update locations set
  image_url = $q$https://upload.wikimedia.org/wikipedia/commons/e/e1/TheTabernacleAtlantaFacadeJan2009.JPG$q$,
  image_attribution = $q$Photo: Tim Farley, CC BY-SA 3.0, via Wikimedia Commons$q$
where slug = 'the-tabernacle';

update locations set
  image_url = $q$https://upload.wikimedia.org/wikipedia/commons/0/02/Roswell%2C_Chattahoochee_River_National_Recreation_Area.jpg$q$,
  image_attribution = $q$The Roswell stretch. Photo: JJonahJackalope, CC BY-SA 4.0, via Wikimedia Commons$q$
where slug = 'chattahoochee-river';

update locations set
  image_url = $q$https://upload.wikimedia.org/wikipedia/commons/6/6d/Dome_of_the_Georgia_State_Capitol_%283491661873%29.jpg$q$,
  image_attribution = $q$Photo: atlexplorer, CC BY-SA 2.0, via Wikimedia Commons$q$
where slug = 'georgia-state-capitol';

update locations set
  image_url = $q$https://upload.wikimedia.org/wikipedia/commons/4/4f/Buckhead_Theatre.JPG$q$,
  image_attribution = $q$Photo: Keizers, CC BY-SA 3.0, via Wikimedia Commons$q$
where slug = 'buckhead-theatre';

update locations set
  image_url = $q$https://upload.wikimedia.org/wikipedia/commons/e/e3/Ryman_Auditorium.jpg$q$,
  image_attribution = $q$Photo: Daniel Schwen, CC BY-SA 3.0, via Wikimedia Commons$q$
where slug = 'ryman-auditorium';

update locations set
  image_url = $q$https://upload.wikimedia.org/wikipedia/commons/6/60/Tootsies_Orchid_Lounge_-_Nashville.jpg$q$,
  image_attribution = $q$Photo: Kathleen Conklin, CC BY 2.0, via Wikimedia Commons$q$
where slug = 'tootsies-orchid-lounge';

update locations set
  image_url = $q$https://upload.wikimedia.org/wikipedia/commons/8/81/RCA_Studio_B_backdoor.jpg$q$,
  image_attribution = $q$Photo: Adinda Uneputty, CC BY-SA 2.0, via Wikimedia Commons$q$
where slug = 'rca-studio-b';

update locations set
  image_url = $q$https://upload.wikimedia.org/wikipedia/commons/d/d5/Owen_Bradley%27s_Quonset_Hut_Studio_console%2C_CMHF.jpg$q$,
  image_attribution = $q$Owen Bradley's Quonset Hut console. Photo: Cliff, CC BY 2.0, via Wikimedia Commons$q$
where slug = 'quonset-hut';

update locations set
  image_url = $q$https://upload.wikimedia.org/wikipedia/commons/0/0b/Bluebird_Cafe_-_June_2024_-_Sarah_Stierch_08.jpg$q$,
  image_attribution = $q$Inside the Bluebird. Photo: Missvain, CC0, via Wikimedia Commons$q$
where slug = 'bluebird-cafe';

update locations set
  image_url = $q$https://upload.wikimedia.org/wikipedia/commons/9/90/Opry-house%2C_Nashville.jpg$q$,
  image_attribution = $q$Photo: public domain, via Wikimedia Commons$q$
where slug = 'grand-ole-opry-house';

update locations set
  image_url = $q$https://upload.wikimedia.org/wikipedia/commons/a/a9/Hatch_Show_Print_December_2019_interior_general_view.jpg$q$,
  image_attribution = $q$The letterpress floor. Photo: Jeremy Thompson, CC BY 2.0, via Wikimedia Commons$q$
where slug = 'hatch-show-print';
