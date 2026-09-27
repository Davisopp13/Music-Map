# Updates 13–14: content evidence and review ledger

Research checked 2026-09-27. Davis has now applied updates 13–14; subsequent live data verification passed, including image-file metadata and Spotify resolution. The research and review limitations below remain applicable. Read this ledger with the two SQL files. All 42 pre-existing stories and current-state notes were inspected; every row below distinguishes supported material from unresolved inherited details. A flag means **not independently confirmed**, not necessarily false. These flags are deliberately retained for Davis’s editorial judgment; this is not a blanket certification of every old claim.

## Result and scope

| Chapter | Before | Added | After |
|---|---:|---:|---:|
| Bristol | 11 | 1 | 12 |
| Macon | 9 | 2 | 11 |
| Atlanta | 13 | 7 | 20 |
| Nashville | 9 | 3 | 12 |

Four cities; 55 pins; five trails / 41 stops; 33 connections (+8, including three new cross-city); eight unchanged districts; 22 venue pins; 33 existing Spotify pairs; 38 populated images / 17 intentional blanks. No WERD replacement pin, new city, district, or live database mutation. All new pins are core-map pins (`is_orbit = false`). All new Spotify and setlist.fm pairs are null.

**UI limitation:** `src/components/CityExperience.tsx` currently selects `trails[0]`. The second Atlanta trail is valid stored data, but cannot be selected in the current interface. The original trail remains first. No app code was changed; making the second trail selectable is separate work requiring Davis’s direction.

## Evidence conventions

Sources below are primary institutions, official sites, historical markers, reputable reporting, or clearly identified archives. OSM/Nominatim verifies a place/address, not its music-history claims. Coordinates are approximate map points, not surveyed entrances. Named building centroids and address interpolation are distinguished. Existing `coords_verified` flags are preserved unless coordinates are explicitly corrected; failed fresh searches are disclosed rather than misrepresented as successful re-verification.

Dates in `era_start` refer to the narrated chapter (sometimes a business’s origin or an interpreted period), not necessarily the present building’s construction. Null end means the interpretive story continues, not a promise of public access. Venue links point to the canonical official calendar where no separate stable ticket landing page exists.

## New pins

### variety-playhouse

**Variety Playhouse — atlanta; confidence: high.** Era 1940–ongoing; `venue`.

Historical and current-use evidence:

- [Source](https://www.variety-playhouse.com/getting-here/)
- [Source](https://online.flippingbook.com/view/621208/48/)
- [Source](https://www.variety-playhouse.com/)

Address: 1099 Euclid Avenue NE, Atlanta, GA 30307. Coordinate: `33.76351, -84.3508547`. Method: Exact named theater and house-number match. [OSM reference](https://www.openstreetmap.org/way/217805597).

Image: [exact file and provenance](https://commons.wikimedia.org/wiki/File:VarietyPlayhouseAtlantaFrontFacade.JPG); Krelnik; [CC BY 3.0](https://creativecommons.org/licenses/by/3.0). Subject metadata: The front facade of Variety Playhouse, a 1940s-era former cinema at 1099 Euclid Ave. NE, Atlanta, Georgia..

Current-state wording: An active concert venue in Little Five Points; check the official calendar for shows and box-office hours.

### wax-n-facts

**Wax 'n' Facts — atlanta; confidence: high.** Era 1976–ongoing; `marker`.

Historical and current-use evidence:

- [Source](https://waxnfacts.net/)
- [Source](https://www.little5pointsofficial.com/history/wax-%27n-facts)
- [Source](https://www.worldradiohistory.com/Archive-All-Music/Billboard/90s/1993/BB-1993-07-17.pdf)

Address: 432 Moreland Avenue NE, Atlanta, GA 30307. Coordinate: `33.7661399, -84.3491836`. Method: Named shop match; official site supplies house number omitted by OSM. [OSM reference](https://www.openstreetmap.org/node/1237654286).

Image: null. No exact-subject file with sufficiently clear reusable rights established in this pass; official promotional images are not presumed reusable.

Current-state wording: An operating independent record shop. Check current hours before visiting or bringing records to sell.

### star-community-bar

**Star Community Bar — atlanta; confidence: high.** Era 1991–ongoing; `venue`.

Historical and current-use evidence:

- [Source](https://www.starbaratl.bar/about)
- [Source](https://roughdraftatlanta.com/2021/10/04/star-bar-co-founder-marty-nolan-dead-at-65/)
- [Source](https://www.gpb.org/news/2022/12/08/atlantas-star-community-bar-avoids-demolition-makes-future-plans)

Address: 437 Moreland Avenue NE, Atlanta, GA 30307. Coordinate: `33.766254, -84.348824`. Method: Exact named venue and address match. [OSM reference](https://www.openstreetmap.org/way/961280995).

Image: null. No exact-subject file with sufficiently clear reusable rights established in this pass; official promotional images are not presumed reusable.

Current-state wording: An active bar and music venue, with shows and comedy. Check the official event listing for admission and age restrictions.

### wrfg-radio

**WRFG — Radio Free Georgia — atlanta; confidence: medium.** Era 1973–ongoing; `studio`.

Historical and current-use evidence:

- [Source](https://wrfg.org/about-wrfg/)
- [Source](https://www.axios.com/local/atlanta/2026/01/13/wrfg-atlanta-listening-booth-little-five-points-community-center)

Address: 1083 Austin Avenue NE, Atlanta, GA 30307. Coordinate: `33.7621973, -84.3526031`. Method: Named host building at exact official station address; not an assertion of the original 1973 studio location. [OSM reference](https://www.openstreetmap.org/node/5263894122).

Image: null. No exact-subject file with sufficiently clear reusable rights established in this pass; official promotional images are not presumed reusable.

Current-state wording: An active community radio station at the Little Five Points Community Center. Listen online; studio visits require arrangements.

### ebenezer-heritage-sanctuary

**Ebenezer Baptist Church — Heritage Sanctuary — atlanta; confidence: high.** Era 1960–ongoing; `museum`.

Historical and current-use evidence:

- [Source](https://www.nps.gov/places/ebenezer-heritage-sanctuary.htm)
- [Source](https://www.nps.gov/malu/planyourvisit/ebenezer_baptist_church.htm)
- [Source](https://crdl.usg.edu/iiif-viewer?manifest=https%3A%2F%2Fcrdl.usg.edu%2Frecord%2Fugabma_wsbn_wsbn38280%2Fpresentation%2Fmanifest.json)

Address: 407 Auburn Avenue NE, Atlanta, GA 30312. Coordinate: `33.7548066, -84.3742353`. Method: Nominatim exact street-address match, south side of Auburn; the named church result north of Auburn is not used. Era starts with the interpreted co-pastorate, not construction. [OSM reference](https://www.openstreetmap.org/way/270493865).

Image: [exact file and provenance](https://commons.wikimedia.org/wiki/File:Historic_Ebenezer_Baptist_Church_in_Atlanta,_June_2015.jpg); Marc Merlin; [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0). Subject metadata: Historic Ebenezer Baptist Church in Atlanta, June 2015.

Current-state wording: The historic Heritage Sanctuary is interpreted by the National Park Service. Check park access notices and ranger-program hours; this is distinct from the newer Horizon Sanctuary.

### patchwerk-recording-studios

**Patchwerk Recording Studios — atlanta; confidence: high.** Era 1995–ongoing; `studio`.

Historical and current-use evidence:

- [Source](https://patchwerk.com/index.php/company-info/about-us)
- [Source](https://www.mixonline.com/recording/from-urban-to-beyondpatchwerk-recording)
- [Source](https://ozmagazine.com/raising-the-sound-bar/)

Address: 1094 Hemphill Avenue NW, Atlanta, GA 30318. Coordinate: `33.7846284, -84.4064291`. Method: Official address matched to OSM building via Nominatim; Commons place metadata also links this exact OSM way, distinguishing a second address result across the street. [OSM reference](https://www.openstreetmap.org/way/269845466).

Image: [exact file and provenance](https://commons.wikimedia.org/wiki/File:Patchwerk_sign.JPG); Subzzee; [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0). Subject metadata: A picture of the <a href="https://en.wikipedia.org/wiki/en:PatchWerk_Recording_Studios" class="extiw" title="w:en:PatchWerk Recording Studios">Patchwerk</a> sign hanging in the entrance of the studios..

Current-state wording: An active recording, mixing, and mastering facility. Sessions and advertised tours are arranged through Patchwerk.

### trap-music-museum

**Trap Music Museum — atlanta; confidence: high.** Era 2018–ongoing; `museum`.

Historical and current-use evidence:

- [Source](https://trapmusicmuseum.com/)
- [Source](https://www.thefader.com/2018/09/22/ti-trap-museum-atlanta)
- [Source](https://trapmusicmuseum.us/)

Address: 630 Travis Street NW, Atlanta, GA 30318. Coordinate: `33.7718036, -84.4086916`. Method: Exact named museum and current official street-address match. [OSM reference](https://www.openstreetmap.org/node/12473049369).

Image: null. No exact-subject file with sufficiently clear reusable rights established in this pass; official promotional images are not presumed reusable.

Current-state wording: The museum currently lists 630 Travis Street NW and ticketed visits. Use its official site for current hours; older listings use a different address.

### country-music-hall-of-fame

**Country Music Hall of Fame and Museum — nashville; confidence: high.** Era 2001–ongoing; `museum`.

Historical and current-use evidence:

- [Source](https://www.countrymusichalloffame.org/about)
- [Source](https://countrymusichalloffame.org/hall-of-fame/rotunda)
- [Source](https://countrymusichalloffame.org/hall-of-fame/jimmie-rodgers)
- [Source](https://countrymusichalloffame.org/hall-of-fame/carter-family)
- [Source](https://www.countrymusichalloffame.org/experiences/studio-b/tour-studio-b)

Address: 222 Rep. John Lewis Way S, Nashville, TN 37203. Coordinate: `36.1581728, -86.7760929`. Method: Exact named museum at 222; reject the similarly named airport shop. [OSM reference](https://www.openstreetmap.org/way/130905919).

Image: [exact file and provenance](https://commons.wikimedia.org/wiki/File:Country_Music_Hall_of_Fame_2022a.jpg); Antony-22; [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0). Subject metadata: Country Music Hall of Fame and Museum in Nashville, Tennessee in 2022.

Current-state wording: An operating downtown museum with exhibitions, the Hall of Fame Rotunda, and ticketed experiences. Studio B tours depart from the museum.

### fisk-jubilee-hall

**Fisk University — Jubilee Hall — nashville; confidence: high.** Era 1876–ongoing; `home`.

Historical and current-use evidence:

- [Source](https://www.fisk.edu/about/history/)
- [Source](https://www.loc.gov/item/tn0017/)
- [Source](https://www.fisk.edu/campus-life/housing-residence-life/)

Address: Jubilee Hall, 17th Avenue N, Fisk University, Nashville, TN 37208. Coordinate: `36.1690673, -86.8049572`. Method: Exact named Jubilee Hall building; LOC street location and Fisk campus identify the site. [OSM reference](https://www.openstreetmap.org/way/759701057).

Image: [exact file and provenance](https://commons.wikimedia.org/wiki/File:Jubilee_Hall,_Fisk_University.jpg); Unknown photographer (published 1910); [Public domain](https://commons.wikimedia.org/wiki/File:Jubilee_Hall,_Fisk_University.jpg#Licensing). Subject metadata: Jubilee Hall on the campus of Fisk University in Nashville, Tennessee. Historical photograph published in 1910, not a current exterior view.

Current-state wording: An active Fisk University residence hall and historic landmark. Exterior campus visit subject to university guidance; no drop-in dormitory access.

### national-museum-african-american-music

**National Museum of African American Music — nashville; confidence: high.** Era 2021–ongoing; `museum`.

Historical and current-use evidence:

- [Source](https://www.nmaam.org/about/)
- [Source](https://www.nmaam.org/about/contact-us/)

Address: 510 Broadway, Nashville, TN 37203. Coordinate: `36.1608246, -86.7792151`. Method: Exact named museum and official 510 Broadway match. [OSM reference](https://www.openstreetmap.org/node/4673828917).

Image: [exact file and provenance](https://commons.wikimedia.org/wiki/File:National_Museum_of_African_American_Music,_Fifth_%2B_Broadway,_Broadway_and_5th_Avenue,_Nashville,_TN_(54384524318).jpg); Warren LeMay from Chicago, IL, United States; [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0). Subject metadata: Built in 2017-2021, this Contemporary building was designed by Gresham Smith as part of the Fifth + Broadway development in Downtown Nashville, and houses the National Museum of African American Music.  The building is characteristic of the newer buildings that have been built as part of the revitalization and redevelopment of Downtown Nashville..

Current-state wording: An operating museum at Fifth + Broadway, with its entrance on Rep. John Lewis Way. Check official admission information and opening hours.

### anns-tic-toc

**Ann’s Tic Toc — Little Richard’s Early Stage — macon; confidence: medium.** Era 1950–ongoing; `marker`.

Historical and current-use evidence:

- [Source](https://www.hmdb.org/m.asp?m=186758)
- [Source](https://historicmacon.org/music-registry)
- [Source](https://www.macon.com/living/food-drink/article308403705.html)

Address: 408 Martin Luther King Jr Boulevard, Macon, GA 31201. Coordinate: `32.8342943, -83.6259496`. Method: Exact named Tic Toc Room building at marker address. Era 1950 denotes the early-1950s performance period, not an asserted opening year. [OSM reference](https://www.openstreetmap.org/way/985509668).

Image: null. No exact-subject file with sufficiently clear reusable rights established in this pass; official promotional images are not presumed reusable.

Current-state wording: Historic nightclub site with a music-history marker. Later restaurant use is documented; current tenant and public interior access have not been confirmed.

### mcduffie-bell-house

**Bell House — McDuffie Center for Strings — macon; confidence: medium.** Era 2015–ongoing; `home`.

Historical and current-use evidence:

- [Source](https://mcduffie.mercer.edu/bell-house)
- [Source](https://mcduffie.mercer.edu/about)
- [Source](https://www.mercer.edu/wp-content/uploads/2019/03/mercerian-15-spring.pdf)

Address: 315 College Street, Macon, GA 31201. Coordinate: `32.8427962, -83.6375646`. Method: Nominatim house-number interpolation on College Street matched to official address; Macon city result selected, excluding other Macon counties. Approximate frontage, not surveyed entrance. [OSM reference](https://www.openstreetmap.org/way/9029375).

Image: null. No exact-subject file with sufficiently clear reusable rights established in this pass; official promotional images are not presumed reusable.

Current-state wording: An active university teaching and performance space. Check McDuffie Center concert listings for public events and their venues; routine interior access is not assumed.

### wcyb-farm-and-fun-time

**WCYB’s Farm and Fun Time — Historical Marker — bristol; confidence: medium.** Era 1946–ongoing; `marker`.

Historical and current-use evidence:

- [Source](https://www.hmdb.org/m.asp?m=258050)
- [Source](https://birthplaceofcountrymusic.org/about/news/radio-bristol-wcyb-unveil-farm-and-fun-time-artifact-in-new-partnership-announcement/)
- [Source](https://birthplaceofcountrymusic.org/radio/programs/farm-and-fun-time/)

Address: Winston Alley at Piedmont Avenue, near 153 Piedmont Avenue, Bristol, VA 24201. Coordinate: `36.5959, -82.1844333`. Method: Marker coordinates from photographed historical marker record (36°35.754′ N, 82°11.066′ W); Nominatim matches adjacent 153 Piedmont building, about 16 m away. Deliberately not hotel coordinates. [OSM reference](https://www.openstreetmap.org/node/13070914077).

Image: null. No exact-subject file with sufficiently clear reusable rights established in this pass; official promotional images are not presumed reusable.

Current-state wording: A sidewalk history marker near Winston Alley and Piedmont Avenue. The original hotel studio was elsewhere and is demolished; current Farm and Fun Time shows have separately advertised venues.

## Atlanta walking route

`atlanta-auburn-to-little-five`: Ebenezer Heritage Sanctuary → WRFG → Variety Playhouse → Criminal Records → Wax ’n’ Facts → Star Community Bar.

The OSM-backed [FOSSGIS Valhalla pedestrian service](https://valhalla1.openstreetmap.de/) returned **1.9765 miles** and about **39 minutes of moving time**, before browsing or stops, on 2026-09-27. Plan an afternoon, with an optional evening show. This is total routed distance, not a radius or straight-line sum. Long first leg from Sweet Auburn to Little Five Points, then a compact sequence of working radio, concert, and shop addresses. Use public sidewalks and marked crossings, especially Moreland. There is no need to enter a private studio to complete the walk. Opening hours are not synchronized; a weekday afternoon and a booked show are different access plans.

To reproduce, submit `GET /route?json=…` to that service with `costing: "pedestrian"`, `units: "miles"`, and these ordered coordinates (Valhalla calls longitude `lon`):

```json
{
  "locations": [
    {
      "lat": 33.7548066,
      "lon": -84.3742353
    },
    {
      "lat": 33.7621973,
      "lon": -84.3526031
    },
    {
      "lat": 33.76351,
      "lon": -84.3508547
    },
    {
      "lat": 33.76512,
      "lon": -84.34971
    },
    {
      "lat": 33.7661399,
      "lon": -84.3491836
    },
    {
      "lat": 33.766254,
      "lon": -84.348824
    }
  ],
  "costing": "pedestrian",
  "units": "miles"
}
```

No field walk or accessibility survey was performed. Routing reflects mapped pedestrian connectivity, not a guarantee that every temporary crossing or construction condition is unchanged. No new district is needed: the existing Little Five Points wash already frames the cluster.

## Audit of all 42 existing pins

### bristol-sessions-site

**Confidence: flagged.** 1927 sessions, Ralph Peer, Carter Family, Rodgers and registry selection checked. End era narrowed to 1927: the 1928 sessions used another building. Removed unsupported floor/transport rationale, royalty-to-wage calculation and band-breakup detail.

**Needs review:** Historic address 408 versus museum visitor directions to plaque at 416 State Street needs an on-site check. Retain inherited site coordinates; no fresh named OSM result. “First two superstars” is interpretation, not a measurable priority claim.

- [Evidence](https://birthplaceofcountrymusic.org/visit/faqs/)
- [Evidence](https://birthplaceofcountrymusic.org/about/our-legacy/)
- [Evidence](https://www.loc.gov/programs/national-recording-preservation-board/recording-registry/complete-national-recording-registry-listing/)

Coordinate audit: [fresh Nominatim query](https://nominatim.openstreetmap.org/search?q=1927+Bristol+Sessions+Site+bristol&format=jsonv2&addressdetails=1&limit=3) did not establish an exact named-site match (irrelevant results rejected). Existing coordinate/flag retained from the baseline; **fresh precision is unconfirmed**. Consult prior geocode updates and source address before relocating.

Final address: 408 State Street, Bristol, TN 37620.

**SQL field changes:** `era_end`, `story_md`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.

- `era_end`: 1928 → 1927

Retained/final image attribution: Photo: Swampyank, CC BY-SA 4.0, via Wikimedia Commons. [File provenance and license](https://commons.wikimedia.org/wiki/File:Site%20of%20Bristol%20Sessions%20Recordings%20in%20Bristol%2C%20Tennessee%20where%20the%20Carter%20Family%20and%20Jimmie%20Rogers%20were%20recorded%20in%201927.jpg). Existing image provenance is inherited from update 10/12; this pass does not claim a new visual inspection of every retained file.

### birthplace-of-country-music-museum

**Confidence: high.** 2014 opening and Smithsonian affiliation confirmed; Radio Bristol launched August 27, 2015. Corrected address to official 101 Country Music Way and exact OSM museum coordinates.

- [Evidence](https://birthplaceofcountrymusic.org/about/)
- [Evidence](https://birthplaceofcountrymusic.org/radio/about/)

Coordinate audit: named search `Birthplace of Country Music Museum bristol` returned [Birthplace of Country Music Museum](https://www.openstreetmap.org/way/1158067925) at `36.5962872, -82.1828615`. SQL adopts this point.

Final address: 101 Country Music Way, Bristol, VA 24201.

**SQL field changes:** `address`, `lat`, `lng`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.

- `address`: 520 Birthplace of Country Music Way, Bristol, VA 24201 → 101 Country Music Way, Bristol, VA 24201
- `lat`: 36.59611 → 36.5962872
- `lng`: -82.18278 → -82.1828615

Retained/final image attribution: Photo: Swampyank, CC BY-SA 4.0, via Wikimedia Commons. [File provenance and license](https://commons.wikimedia.org/wiki/File:Birthplace%20of%20Country%20Music%20Museum%20in%20Bristol%2C%20Virginia.jpg). Existing image provenance is inherited from update 10/12; this pass does not claim a new visual inspection of every retained file.

### state-street-line

**Confidence: flagged.** Border and downtown context supported. Removed unsupported “largest urban area in Appalachia” and causal explanation for recruitment.

**Needs review:** Era 1900 is a broad editorial marker, not a documented opening date; brass-marker exact location and current streetscape not newly field-verified.

- [Evidence](https://www.movetobristol.com/walkingtour)
- [Evidence](https://birthplaceofcountrymusic.org/about/our-legacy/)

Coordinate audit: [fresh Nominatim query](https://nominatim.openstreetmap.org/search?q=State+Street+%E2%80%94+The+TN%2FVA+Line+bristol&format=jsonv2&addressdetails=1&limit=3) did not establish an exact named-site match (irrelevant results rejected). Existing coordinate/flag retained from the baseline; **fresh precision is unconfirmed**. Consult prior geocode updates and source address before relocating.

Final address: State Street, Bristol TN/VA.

**SQL field changes:** `story_md`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.


Retained/final image attribution: Photo: Jason Riedy, CC BY 2.0, via Wikimedia Commons. [File provenance and license](https://commons.wikimedia.org/wiki/File:State%20line%20on%20State%20Street%20in%20Bristol%20TN%20VA.%20%282882596558%29.jpg). Existing image provenance is inherited from update 10/12; this pass does not claim a new visual inspection of every retained file.

### bristol-sign

**Confidence: flagged.** 1910 original sign, 1915 relocation and 1921 slogan documented. Removed incorrect Volunteer Parkway junction.

**Needs review:** Inherited coordinate retained: official history establishes the State Street location, but the fresh named geocoder query returned no match.

- [Evidence](https://www.bristoltn.gov/Archive/ViewFile/Item/112)
- [Evidence](https://www.movetobristol.com/walkingtour)

Coordinate audit: [fresh Nominatim query](https://nominatim.openstreetmap.org/search?q=The+Bristol+Sign+bristol&format=jsonv2&addressdetails=1&limit=3) did not establish an exact named-site match (irrelevant results rejected). Existing coordinate/flag retained from the baseline; **fresh precision is unconfirmed**. Consult prior geocode updates and source address before relocating.

Final address: State Street near the Bristol train station, Bristol TN/VA.

**SQL field changes:** `address`, `story_md`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.

- `address`: State Street at Volunteer Parkway, Bristol TN/VA → State Street near the Bristol train station, Bristol TN/VA

Retained/final image attribution: Photo: Bwheelerrtrm, CC BY-SA 3.0, via Wikimedia Commons. [File provenance and license](https://commons.wikimedia.org/wiki/File:Bristol%20Virginia-Tennessee%20Slogan%20Sign%202012-09-27%2021-44-45.jpg). Existing image provenance is inherited from update 10/12; this pass does not claim a new visual inspection of every retained file.

### paramount-bristol

**Confidence: flagged.** Opening corrected February 21 → February 20, 1931. Reopening retained at year precision (1991); removed conflicting exact day, unsourced funding/penny anecdote, exact seat count and performer roster.

**Needs review:** Local accounts differ on the reopening day; do not restore April 24 without archival proof. Exact fundraising totals, pennies, Ford final-hometown-performance claim and old roster remain unconfirmed.

- [Evidence](https://paramountbristol.org/about-paramount-bristol/)
- [Evidence](https://www.aamearts.org/magazine/article/a-brief-history-of-the-paramount-center/201703262108141782)

Coordinate audit: named search `Paramount Center for the Arts bristol` returned [Paramount Center for the Arts](https://www.openstreetmap.org/node/2485404236) at `36.5947756, -82.1826275`. Existing point retained; a building/area centroid is not automatically a better entrance or historical-site point.

Final address: 518 State Street, Bristol, TN 37620.

**SQL field changes:** `story_md`, `what_is_there_now`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.

- `what_is_there_now`: A restored 756-seat Art Deco theater on the National Register of Historic Places, still Bristol's premier live venue. → A restored Art Deco theater with an active performance calendar. Check the official schedule for tickets and access.

Retained/final image attribution: Photo: Carol M. Highsmith, public domain, via Library of Congress / Wikimedia Commons. [File provenance and license](https://commons.wikimedia.org/wiki/File:Paramount%20Theater%2C%20Bristol%2C%20Tennessee%20LCCN2011630773.tiff%3Fwidth%3D1600). Existing image provenance is inherited from update 10/12; this pass does not claim a new visual inspection of every retained file.

### tennessee-ernie-ford-birthplace

**Confidence: flagged.** February 13, 1919 birth, WOPI start and association ownership checked. Removed unsupported B-29 combat-mission assertion, restoration consultation/final visit and misleading unrelated portrait. Address matched to OSM house.

**Needs review:** Restoration chronology should distinguish acquisition in 1991 from later work; the old story implied the whole restoration occurred in Ford’s lifetime. Two-block distance is dropped.

- [Evidence](https://www.bristolhistoricalassociation.com/erniefordhouse)

Coordinate audit: named search `Tennessee Ernie Ford Birthplace bristol` returned [Tennessee Ernie Ford Birthplace](https://www.openstreetmap.org/way/1158069098) at `36.5924683, -82.1958544`. SQL adopts this point.

Final address: 1223 Anderson Street, Bristol, TN 37620.

**SQL field changes:** `lat`, `lng`, `image_url`, `image_attribution`, `story_md`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.

- `lat`: 36.5924 → 36.5924683
- `lng`: -82.19533 → -82.1958544
- `image_url`: https://upload.wikimedia.org/wikipedia/commons/a/ab/Tennessee_Ernie_Ford_1957.JPG → None
- `image_attribution`: Tennessee Ernie Ford in 1957. Photo: NBC Television, public domain, via Wikimedia Commons → None

Final image: null (intentional gap).

### carter-family-fold

**Confidence: flagged.** Janette, family relationship, 1974 founding and Cash final July 5, 2003 performance supported. Corrected year-round schedule to seasonal February–November.

**Needs review:** Official site has inconsistent 1974/1979 wording; 50th anniversary in 2024 and oral history support 1974. Exact 800-seat capacity and blanket electrical-instrument rule retained as historical descriptions, not admission guarantees.

- [Evidence](https://carterfamilyfold.org/)
- [Evidence](https://www.southernfoodways.org/oral-history/carter-family-fold/)
- [Evidence](https://www.aamearts.org/magazine/article/a-short-history-of-the-carter-family-fold/202402261650081627)

Coordinate audit: [fresh Nominatim query](https://nominatim.openstreetmap.org/search?q=The+Carter+Family+Fold+bristol&format=jsonv2&addressdetails=1&limit=3) did not establish an exact named-site match (irrelevant results rejected). Existing coordinate/flag retained from the baseline; **fresh precision is unconfirmed**. Consult prior geocode updates and source address before relocating.

Final address: 3449 A.P. Carter Highway, Hiltons, VA 24258.

**SQL field changes:** `venue_status`, `what_is_there_now`, `story_md`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.

- `venue_status`: active → seasonal
- `what_is_there_now`: Live music every Saturday at 7:30, museum opens an hour before. About 45 minutes from downtown Bristol — worth every mile. → Seasonal old-time and bluegrass shows, normally Saturdays February–November. Check the official calendar for dates, doors, and museum access; an orbit trip outside Bristol.

Retained/final image attribution: A.P. Carter's birthplace cabin, preserved on the Fold grounds. Photo: Southern Foodways Alliance, CC BY 2.0, via Wikimedia Commons. [File provenance and license](https://commons.wikimedia.org/wiki/File:APs%20homeplace%20cabin-exterior%202%20copy%20%283304731233%29.jpg). Existing image provenance is inherited from update 10/12; this pass does not claim a new visual inspection of every retained file.

### burger-bar

**Confidence: flagged.** Williams stop treated explicitly as legend. Historical pin stays at old Piedmont site; current restaurant lists 120 Piedmont. Removed incorrect implication that the old site remains the operating diner.

**Needs review:** 1942 origin, exact stop/death chronology and “last seen alive” cannot be independently established here. Era retained as inherited restaurant date. Relocation date/current use of old address unconfirmed.

- [Evidence](https://www.theoriginalburgerbar.com/about)
- [Evidence](https://explorebristol.com/burger-bar/)

Coordinate audit: named search `Burger Bar bristol` returned [Burger Bar](https://www.openstreetmap.org/way/240916451) at `36.5953062, -82.1852239`. Existing point retained; a building/area centroid is not automatically a better entrance or historical-site point.

Final address: 8 Piedmont Avenue, Bristol, VA 24201.

**SQL field changes:** `name`, `what_is_there_now`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.

- `name`: Burger Bar → Burger Bar — Historic Site
- `what_is_there_now`: Still slinging burgers. Hank memorabilia on the walls. → Historic Burger Bar site near State Street. The operating restaurant now lists 120 Piedmont Avenue; this pin preserves the location associated with the Hank Williams story, not current dining directions.

Retained/final image attribution: Photo: Carol M. Highsmith Archive, Library of Congress, public domain. [File provenance and license](https://commons.wikimedia.org/wiki/File:12578v.jpg). Existing image provenance is inherited from update 10/12; this pass does not claim a new visual inspection of every retained file.

### rhythm-and-roots

**Confidence: high.** 2001 beginning and annual September festival supported. “Dozens of stages” replaced with multiple stages; yearly footprint and lineup are variable.

- [Evidence](https://birthplaceofcountrymusic.org/festival-bristol-rhythm/)

Coordinate audit: [fresh Nominatim query](https://nominatim.openstreetmap.org/search?q=Bristol+Rhythm+%26+Roots+Reunion+bristol&format=jsonv2&addressdetails=1&limit=3) did not establish an exact named-site match (irrelevant results rejected). Existing coordinate/flag retained from the baseline; **fresh precision is unconfirmed**. Consult prior geocode updates and source address before relocating.

Final address: Historic Downtown State Street, Bristol TN/VA.

**SQL field changes:** `story_md`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.


Retained/final image attribution: State Street, the festival's footprint. Photo: AppalachianCentrist, CC BY-SA 4.0, via Wikimedia Commons. [File provenance and license](https://commons.wikimedia.org/wiki/File:State%20Street%20-%20Bristol%2C%20TN-VA.jpg). Existing image provenance is inherited from update 10/12; this pass does not claim a new visual inspection of every retained file.

### cameo-theatre

**Confidence: flagged.** March 30, 1925 opening and 2025 Theatre Bristol acquisition/performance return checked. Removed unconfirmed church/radio-station uses and Stanley co-restoration attribution.

**Needs review:** Exact restoration phases/credits require further archival work; Brent Buchanan acquisition connection supported.

- [Evidence](https://theatrebristol.org/2025/03/22/cameo-theatre-centennial-open-house-ribbon-cutting/)
- [Evidence](https://theatrebristol.org/2025/02/12/the-cameo-theater/)

Coordinate audit: named search `Cameo Theatre bristol` returned [Cameo Theatre - WHCB radio](https://www.openstreetmap.org/way/240916440) at `36.5952472, -82.1854053`. Existing point retained; a building/area centroid is not automatically a better entrance or historical-site point.

Final address: 703 State Street, Bristol, VA 24201.

**SQL field changes:** `story_md`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.


Retained/final image attribution: Photo: ceedub13, CC BY 2.0, via Wikimedia Commons. [File provenance and license](https://commons.wikimedia.org/wiki/File:1920px-Bristol%2C%20VA%20Cameo%20Theater%20%283228970587%29.jpg). Existing image provenance is inherited from update 10/12; this pass does not claim a new visual inspection of every retained file.

### hard-rock-live-bristol

**Confidence: high.** November 14, 2024 permanent opening, Blake Shelton, 23,000 square feet and 2,000-plus room supported. Current event policy made listing-specific.

- [Evidence](https://www.hardrock.com/blog/hard-rock-hotel-and-casino-bristol-celebrates-grand-opening)
- [Evidence](https://casino.hardrock.com/bristol/entertainment)

Coordinate audit: [fresh Nominatim query](https://nominatim.openstreetmap.org/search?q=Hard+Rock+Live+Bristol+bristol&format=jsonv2&addressdetails=1&limit=3) did not establish an exact named-site match (irrelevant results rejected). Existing coordinate/flag retained from the baseline; **fresh precision is unconfirmed**. Consult prior geocode updates and source address before relocating.

Final address: 500 Gate City Hwy, Bristol, VA 24201.

**SQL field changes:** `what_is_there_now`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.

- `what_is_there_now`: An active 2,000-plus-capacity venue inside Hard Rock Hotel & Casino Bristol. Most events are 21+; check the individual listing before you go. → An active touring venue inside Hard Rock Hotel & Casino Bristol. Check each event for age restrictions, admission, and seating configuration.

Final image: null (intentional gap).

### capricorn-sound-studios

**Confidence: flagged.** 1969 studio, Walden/Wexler/Fenter label history and 2019 Mercer reopening supported. Removed unsourced award totals, exact album count, console specification and causal presidential-election claim; separated Otis/RedWal from founding of the later label.

**Needs review:** Prior story’s RedWal purchase year, exact overdub chronology and room-equipment specifications require archival evidence. City intro also corrected: Otis did not cofound the later Capricorn label.

- [Evidence](https://capricorn.mercer.edu/history/)
- [Evidence](https://capricorn.mercer.edu/museum/)
- [Evidence](https://capricorn.mercer.edu/)

Coordinate audit: [fresh Nominatim query](https://nominatim.openstreetmap.org/search?q=Capricorn+Sound+Studios++macon&format=jsonv2&addressdetails=1&limit=3) did not establish an exact named-site match (irrelevant results rejected). Existing coordinate/flag retained from the baseline; **fresh precision is unconfirmed**. Consult prior geocode updates and source address before relocating.

Final address: 530 Martin Luther King Jr Blvd, Macon, GA 31201.

**SQL field changes:** `story_md`, `what_is_there_now`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.

- `what_is_there_now`: Mercer Music at Capricorn: an active recording studio plus a 1,200 sq ft interactive museum with a Capricorn catalog listening station. → Mercer Music at Capricorn combines working recording studios with a public museum and catalog listening exhibits. Check museum hours and arrange studio access separately.

Retained/final image attribution: The studio in 2014, before Mercer's restoration. Photo: Saginaw-hitchhiker, CC BY-SA 4.0, via Wikimedia Commons. [File provenance and license](https://commons.wikimedia.org/wiki/File:Capricorn%20Sound%20Studios%2C%202014.jpg). Existing image provenance is inherited from update 10/12; this pass does not claim a new visual inspection of every retained file.

### the-big-house

**Confidence: flagged.** January 1970–1973 communal household and current museum supported. Removed unconfirmed house room count/build year, Gregg-residency assertion and “rooms kept as they were” claim.

**Needs review:** Exact residents by month, crash distance and world-largest collection superlative not independently checked; superlative removed.

- [Evidence](https://thebighousemuseum.com/)

Coordinate audit: named search `The Big House  macon` returned [The Allman Brothers Band Museum at The Big House](https://www.openstreetmap.org/way/180076387) at `32.8459038, -83.6557118`. Existing point retained; a building/area centroid is not automatically a better entrance or historical-site point.

Final address: 2321 Vineville Avenue, Macon, GA 31204.

**SQL field changes:** `story_md`, `what_is_there_now`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.

- `what_is_there_now`: The Allman Brothers Band Museum — guitars, gold records, and the actual rooms, kept much as they were. → The Allman Brothers Band Museum, with instruments, photographs, and memorabilia displayed in the former communal home. Check visiting hours.

Retained/final image attribution: Photo: Infrogmation, CC BY-SA 4.0, via Wikimedia Commons. [File provenance and license](https://commons.wikimedia.org/wiki/File:1920px-Allman%20Bros%20Big%20House%20from%20Vineville%2C%20Macon%2C%20Georgia%2C%20USA%20Sept%202021.jpg). Existing image provenance is inherited from update 10/12; this pass does not claim a new visual inspection of every retained file.

### rose-hill-cemetery

**Confidence: flagged.** 1840 cemetery origin and present cemetery/tour access supported.

**Needs review:** Elizabeth Reed inspiration, exact songwriting activity, grave arrangement and guitar-pick custom need a direct music-history citation before being described as independently reverified. Existing narrative retained and explicitly flagged; entrance coordinate is not a grave coordinate.

- [Evidence](https://historicmacon.org/rose-hill)
- [Evidence](https://www.rosehillcemetery.org/history)

Coordinate audit: named search `Rose Hill Cemetery macon` returned [Rose Hill Cemetery](https://www.openstreetmap.org/way/1355991951) at `32.8477472, -83.6334826`. Existing point retained; a building/area centroid is not automatically a better entrance or historical-site point.

Final address: 1071 Riverside Drive, Macon, GA 31201.

No SQL location changes. Flagged inherited details are not being silently rewritten.

Retained/final image attribution: Photo: Infrogmation, CC BY-SA 4.0, via Wikimedia Commons. [File provenance and license](https://commons.wikimedia.org/wiki/File:Rose%20Hill%20Cemetery%2C%20Macon%2C%20Georgia%2C%20USA%201%20Sept%202021%20-%2023.jpg). Existing image provenance is inherited from update 10/12; this pass does not claim a new visual inspection of every retained file.

### h-and-h-restaurant

**Confidence: flagged.** 1959 founding by Inez Hill and Louise Hudson restored to story. Historic Macon supports feeding struggling band members; plate-sharing framed as an account.

**Needs review:** Cook-on-tour specifics and current daily operating schedule not independently rechecked; no new schedule asserted.

- [Evidence](https://historicmacon.org/wwwhistoricmaconorg/blog/2016/5/11/hh-restaurant)

Coordinate audit: named search `H&H Restaurant macon` returned [H & H Restaurant](https://www.openstreetmap.org/way/985512491) at `32.8357675, -83.6348150`. Existing point retained; a building/area centroid is not automatically a better entrance or historical-site point.

Final address: 807 Forsyth Street, Macon, GA 31201.

**SQL field changes:** `story_md`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.


Retained/final image attribution: Photo: Bubba73, CC BY-SA 3.0, via Wikimedia Commons. [File provenance and license](https://commons.wikimedia.org/wiki/File:H%26H%20Restaurant%20sign.jpg). Existing image provenance is inherited from update 10/12; this pass does not claim a new visual inspection of every retained file.

### douglass-theatre

**Confidence: flagged.** Charles Henry Douglass, 1921 theater, Otis talent contests and 1997 reopening supported. Closure corrected to 1973–1997. Removed single 1958 broadcast/Phil Walden discovery causation.

**Needs review:** The exact night Walden first heard Redding is not established by these sources; stop and connection copy no longer claim it.

- [Evidence](https://www.douglasstheatre.org/about-douglass-theatre/)
- [Evidence](https://www.otisreddingfoundation.org/news/happy-80th-birthday-to-otis-redding-2)

Coordinate audit: named search `Douglass Theatre macon` returned [The Douglass Theatre](https://www.openstreetmap.org/way/986222777) at `32.8354763, -83.6257988`. Existing point retained; a building/area centroid is not automatically a better entrance or historical-site point.

Final address: 355 Martin Luther King Jr Blvd, Macon, GA 31201.

**SQL field changes:** `story_md`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.


Retained/final image attribution: Photo: Thomson200, CC0, via Wikimedia Commons. [File provenance and license](https://commons.wikimedia.org/wiki/File:Douglass%20Theatre%2C%20Macon%20July%202024.jpg). Existing image provenance is inherited from update 10/12; this pass does not claim a new visual inspection of every retained file.

### little-richard-house

**Confidence: flagged.** 1932 Macon birth, twelve children, gospel and Greyhound work, major songs and relocated childhood home supported. Trail wording changed from “born here” to childhood home.

**Needs review:** “Every architect” is rhetorical; Beatles/Prince influence is not a complete surveyed lineage. Current drop-in access not guaranteed.

- [Evidence](https://www.georgiaencyclopedia.org/articles/arts-culture/little-richard-penniman-1932-2020/)
- [Evidence](https://visitmacon.org/directory/the-little-richard-house-resource-center-things-to-do/)

Coordinate audit: [fresh Nominatim query](https://nominatim.openstreetmap.org/search?q=The+Little+Richard+House+macon&format=jsonv2&addressdetails=1&limit=3) did not establish an exact named-site match (irrelevant results rejected). Existing coordinate/flag retained from the baseline; **fresh precision is unconfirmed**. Consult prior geocode updates and source address before relocating.

Final address: 416 Craft Street, Macon, GA 31201.

No SQL location changes. Flagged inherited details are not being silently rewritten.

Retained/final image attribution: Photo: Macon-Bibb County Recreation Department, CC0, via Wikimedia Commons. [File provenance and license](https://commons.wikimedia.org/wiki/File:Litte%20richard%20House%20Macon%20GA.jpg). Existing image provenance is inherited from update 10/12; this pass does not claim a new visual inspection of every retained file.

### otis-redding-statue

**Confidence: flagged.** 2002 Cooley sculpture, 2025 move and 2007 foundation supported. Corrected access note: Center is not generally open to public. Removed erroneous “three days after recording” shorthand (initial recording and later overdub are distinct).

**Needs review:** Childhood age five, school departure and Upsetters detail retained but not independently corroborated in the consulted sculpture/mission pages. Image depicts actual statue at former site; caption must not imply current surroundings.

- [Evidence](https://otisredding.com/attraction/otis-redding-statue-otis-redding-center-for-the-arts/)
- [Evidence](https://www.otisreddingfoundation.org/mission)
- [Evidence](https://www.otisreddingfoundation.org/)

Coordinate audit: [fresh Nominatim query](https://nominatim.openstreetmap.org/search?q=Otis+Redding+Statue+%26+Center+for+the+Arts+macon&format=jsonv2&addressdetails=1&limit=3) did not establish an exact named-site match (irrelevant results rejected). Existing coordinate/flag retained from the baseline; **fresh precision is unconfirmed**. Consult prior geocode updates and source address before relocating.

Final address: 436 Cotton Avenue, Macon, GA 31201.

**SQL field changes:** `what_is_there_now`, `story_md`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.

- `what_is_there_now`: The statue fronts the Zelma Redding Amphitheater at the Otis Redding Center for the Arts; the foundation also runs a mini-museum on Cotton Avenue. → The statue is outside the Otis Redding Center for the Arts at 436 Cotton Avenue. The Center is not generally open to the public; contact the Foundation for any museum or interior visit.

Retained/final image attribution: The statue at its original Gateway Park home, before its 2025 move to the Center for the Arts. Photo: Linda Cooley, CC BY-SA 3.0, via Wikimedia Commons. [File provenance and license](https://commons.wikimedia.org/wiki/File:OtisReddingStatue.jpg). Existing image provenance is inherited from update 10/12; this pass does not claim a new visual inspection of every retained file.

### grants-lounge

**Confidence: flagged.** 1971 opening, official 576 Poplar address and active live calendar supported.

**Needs review:** Individual early jam/audition claims for Allmans, Skynyrd, Wet Willie and Marshall Tucker retained as inherited history pending a direct archival citation. Search did not yield a reusable exact-site photograph.

- [Evidence](https://www.historicgrants.com/)

Coordinate audit: [fresh Nominatim query](https://nominatim.openstreetmap.org/search?q=Grant%27s+Lounge+macon&format=jsonv2&addressdetails=1&limit=3) did not establish an exact named-site match (irrelevant results rejected). Existing coordinate/flag retained from the baseline; **fresh precision is unconfirmed**. Consult prior geocode updates and source address before relocating.

Final address: 576 Poplar Street, Macon, GA 31201.

No SQL location changes. Flagged inherited details are not being silently rewritten.

Final image: null (intentional gap).

### macon-city-auditorium

**Confidence: flagged.** Otis funeral corrected December 1968 → December 18, 1967, including original trail and connection. Removed unconfirmed attendance/capacity and exact eulogist detail.

**Needs review:** 1925 opening and copper dome supported by venue history; individual early performance dates for Richard/Brown/Otis remain unconfirmed.

- [Evidence](https://otisredding.com/view-itinerary/)
- [Evidence](https://www.maconcentreplex.org/auditorium/)

Coordinate audit: named search `Macon City Auditorium macon` returned [Macon City Auditorium](https://www.openstreetmap.org/way/170561244) at `32.8373531, -83.6312898`. Existing point retained; a building/area centroid is not automatically a better entrance or historical-site point.

Final address: 415 First Street, Macon, GA 31201.

**SQL field changes:** `story_md`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.


Retained/final image attribution: Vintage postcard, public domain. [File provenance and license](https://commons.wikimedia.org/wiki/File:City%20Auditorium%20Macon%20Georgia%20US%20postcard.jpg). Existing image provenance is inherited from update 10/12; this pass does not claim a new visual inspection of every retained file.

### 152-nassau-street

**Confidence: flagged.** June 1923 Peer/OKeh, June 19 Carson, Goosby/Bogan and 2019 demolition supported. Narrowed worldwide “first” claims; removed unverified Burns opening claim and unrelated Carson portrait.

**Needs review:** Exact demolished footprint uses inherited geocode; no surviving-building match. “First rural blues” priority and categorical causal chain to Bristol removed.

- [Evidence](https://www.nassaustreetsessions.com/history/)
- [Evidence](https://www.smithsonianmag.com/smart-news/atlanta-prepares-demolish-site-country-musics-first-recorded-hit-180972115/)
- [Evidence](https://www.ajc.com/news/local/lawsuit-dismissal-clears-the-way-for-razing-historic-music-site/TgRZvNoXc9I4MymAMQvv0N/)

Coordinate audit: [fresh Nominatim query](https://nominatim.openstreetmap.org/search?q=152+Nassau+Street+%E2%80%94+Site+of+the+South%27s+First+Recordings+atlanta&format=jsonv2&addressdetails=1&limit=3) did not establish an exact named-site match (irrelevant results rejected). Existing coordinate/flag retained from the baseline; **fresh precision is unconfirmed**. Consult prior geocode updates and source address before relocating.

Final address: 152 Nassau Street, Atlanta, GA 30303 (site; building demolished).

**SQL field changes:** `image_url`, `image_attribution`, `story_md`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.

- `image_url`: https://upload.wikimedia.org/wikipedia/commons/b/b0/Fiddlin%27_John_Carson_playing_Turkey_in_the_Straw.jpg → None
- `image_attribution`: Fiddlin' John Carson in 1924. Photo: The Atlanta Journal, public domain, via Wikimedia Commons → None

Final image: null (intentional gap).

### royal-peacock

**Confidence: flagged.** Top Hat origin, Carrie Cunningham’s 1949 Peacock, artist history and 1998 Rosa Parks video supported. New connection links Peacock to OutKast’s Stankonia.

**Needs review:** Full old performer list, Fortune superlative and WERD broomstick story not all independently corroborated; legend remains explicitly a legend. Current official venue link inherited, calendar needs pre-visit check.

- [Evidence](https://www.atlantahistorycenter.com/programs-events/public-programs/juneteenth/royal-peacock/)
- [Evidence](https://www.royalpeacockatl.com/)

Coordinate audit: named search `Royal Peacock atlanta` returned [Royal Peacock Lounge](https://www.openstreetmap.org/node/1139929666) at `33.7556803, -84.3816274`. Existing point retained; a building/area centroid is not automatically a better entrance or historical-site point.

Final address: 186 Auburn Avenue NE, Atlanta, GA 30303.

No SQL location changes. Flagged inherited details are not being silently rewritten.

Retained/final image attribution: Photo: Warren LeMay, CC0, via Wikimedia Commons. [File provenance and license](https://commons.wikimedia.org/wiki/File:The%20Royal%20Peacock%20Nightclub%2C%20Atlanta%2C%20GA%20%2847421895822%29.jpg). Existing image provenance is inherited from update 10/12; this pass does not claim a new visual inspection of every retained file.

### eddies-attic

**Confidence: flagged.** 1991 origin, Eddie Owen, listening-room model and performer history checked against official history.

**Needs review:** 180 seats, exact Monday/semiannual recurrence, “launched” each listed career, Childers and Bieber specifics not fully corroborated. Removed fixed schedule from current note.

- [Evidence](https://eddiesattic.com/about-us/)

Coordinate audit: [fresh Nominatim query](https://nominatim.openstreetmap.org/search?q=Eddie%27s+Attic+atlanta&format=jsonv2&addressdetails=1&limit=3) did not establish an exact named-site match (irrelevant results rejected). Existing coordinate/flag retained from the baseline; **fresh precision is unconfirmed**. Consult prior geocode updates and source address before relocating.

Final address: 515-B N McDonough Street, Decatur, GA 30030.

**SQL field changes:** `what_is_there_now`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.

- `what_is_there_now`: Still Decatur's premier listening room, with shows nearly every night and the open mic tradition alive on Mondays. → An active Decatur listening room with a concert and open-mic calendar. Check the official listing for dates, tickets, and admission details.

Retained/final image attribution: Photo: CC0, via Wikimedia Commons. [File provenance and license](https://commons.wikimedia.org/wiki/File:Eddie%27s%20Attic%20Sign.jpg). Existing image provenance is inherited from update 10/12; this pass does not claim a new visual inspection of every retained file.

### fox-theatre

**Confidence: flagged.** 1929 palace, Mighty Mo, preservation campaign and 1976 Skynyrd recording supported.

**Needs review:** Elvis/Prince roster and exact allocation of benefit proceeds not independently documented in this pass; superlatives are editorial. Current event-specific access requires official calendar.

- [Evidence](https://www.foxtheatre.org/about-us/fox-history)
- [Evidence](https://www.ajc.com/arts-entertainment/2025/07/how-atlanta-saved-the-fox-theatre-50-years-ago/)

Coordinate audit: named search `Fox Theatre atlanta` returned [Fox Theatre](https://www.openstreetmap.org/way/208355446) at `33.7726429, -84.3855618`. Existing point retained; a building/area centroid is not automatically a better entrance or historical-site point.

Final address: 660 Peachtree Street NE, Atlanta, GA 30308.

No SQL location changes. Flagged inherited details are not being silently rewritten.

Retained/final image attribution: The Moorish interior, Historic American Buildings Survey, public domain. [File provenance and license](https://commons.wikimedia.org/wiki/File:VIEW%20OF%20THEATER%20INTERIOR%20-%20Fox%20Theater%2C%20Ponce%20de%20Leon%20Avenue%20and%20East%20Peachtree%20Street%2C%20Atlanta%2C%20Fulton%20County%2C%20GA%20HABS%20GA%2C61-ATLA%2C2-2.tif%3Fwidth%3D1600). Existing image provenance is inherited from update 10/12; this pass does not claim a new visual inspection of every retained file.

### the-tabernacle

**Confidence: flagged.** Church reuse for 1996 Olympics and current address/venue supported. Removed unverified 1910 date, fixed 2,600 capacity, architectural-detail list and artist roster.

**Needs review:** Church completion date varies in secondary accounts; not asserting a replacement date. Capacity depends on room layout.

- [Evidence](https://www.tabernacleatl.com/private-events)
- [Evidence](https://www.tabernacleatl.com/)

Coordinate audit: named search `The Tabernacle atlanta` returned [The Tabernacle](https://www.openstreetmap.org/way/192795412) at `33.7587133, -84.3914223`. Existing point retained; a building/area centroid is not automatically a better entrance or historical-site point.

Final address: 152 Luckie Street NW, Atlanta, GA 30303.

**SQL field changes:** `story_md`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.


Retained/final image attribution: Photo: Tim Farley, CC BY-SA 3.0, via Wikimedia Commons. [File provenance and license](https://commons.wikimedia.org/wiki/File:TheTabernacleAtlantaFacadeJan2009.JPG). Existing image provenance is inherited from update 10/12; this pass does not claim a new visual inspection of every retained file.

### criminal-records

**Confidence: flagged.** 1991 independent store, present 1154 Euclid address and records/comics supported. Current hours made schedule-dependent.

**Needs review:** Old Crow Medicine Show, Dawes and Hotel Fiction in-store recollections are personal-editorial claims from prior update, not independently reverified here. Retained explicitly for Davis review; “open daily” removed.

- [Evidence](https://www.little5pointsofficial.com/directory/criminal-records)
- [Evidence](https://criminalatl.com/)

Coordinate audit: named search `Criminal Records atlanta` returned [Criminal Records](https://www.openstreetmap.org/node/1237972389) at `33.7651483, -84.3496750`. Existing point retained; a building/area centroid is not automatically a better entrance or historical-site point.

Final address: 1154 Euclid Avenue NE, Atlanta, GA 30307 (Little Five Points).

**SQL field changes:** `what_is_there_now`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.

- `what_is_there_now`: Open daily in Little Five Points. Buy a record; the map insists. → An operating record and comics shop in Little Five Points. Check the shop’s current hours and in-store event notices.

Final image: null (intentional gap).

### the-masquerade

**Confidence: high.** Opening corrected 1988 → 1989; 2016 move retained. Current fourth room Altar added (2024). Named OSM venue fixes displaced address geocode. Generic Underground entrance photo removed.

- [Evidence](https://www.masqueradeatlanta.com/about/)
- [Evidence](https://www.masqueradeatlanta.com/introducing-altar/)

Coordinate audit: named search `The Masquerade atlanta` returned [The Masquerade](https://www.openstreetmap.org/node/6369226983) at `33.7517171, -84.3897952`. SQL adopts this point.

Final address: 75 Martin Luther King Jr Dr SW, Atlanta, GA 30303 (Underground Atlanta).

**SQL field changes:** `era_start`, `lat`, `lng`, `image_url`, `image_attribution`, `what_is_there_now`, `story_md`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.

- `era_start`: 1988 → 1989
- `lat`: 33.75229 → 33.7517171
- `lng`: -84.39237 → -84.3897952
- `image_url`: https://upload.wikimedia.org/wikipedia/commons/c/ca/Atlanta_Underground.jpg → None
- `image_attribution`: The Underground Atlanta entrance, the venue's current home. Photo: Thomas Moeller, CC BY 2.0, via Wikimedia Commons → None
- `what_is_there_now`: Operating in Underground Atlanta — Heaven, Hell, and Purgatory, just like always. → Operating at Underground Atlanta with Heaven, Hell, Purgatory, and Altar. Check the event listing for the correct room and entrance.

Final image: null (intentional gap).

### the-dungeon

**Confidence: flagged.** Rico Wade family basement, Organized Noize, Dungeon Family and Big Boi 2019 purchase supported. Changed all-albums-made-here implication to creative roots; no current-ownership certainty or visiting invitation.

**Needs review:** Existing broad residential-street coordinate not independently house-verified and deliberately not made more precise. 1992–1998 is an editorial period, not exhaustive use dates. Fine interior details retained as inherited recollection.

- [Evidence](https://www.ajc.com/life/music-blog/outkasts-big-boi-to-offer-airbnb-stays-at-the-dungeon/PHJPWWT5XVE5DISQZW3PKMKSPM/)
- [Evidence](https://www.abc.net.au/triplej/news/outkast-renting-the-dungeon-on-airbnb/13403386)

Coordinate audit: [fresh Nominatim query](https://nominatim.openstreetmap.org/search?q=The+Dungeon+atlanta&format=jsonv2&addressdetails=1&limit=3) did not establish an exact named-site match (irrelevant results rejected). Existing coordinate/flag retained from the baseline; **fresh precision is unconfirmed**. Consult prior geocode updates and source address before relocating.

Final address: Lakewood Terrace SE, Lakewood Heights, Atlanta, GA 30315.

**SQL field changes:** `what_is_there_now`, `story_md`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.

- `what_is_there_now`: A private home, now owned by Big Boi. View from the map, not the curb. → A private residential site. Big Boi’s purchase was reported in 2019; that historical report is not a current access invitation. Explore this stop from the map.

Final image: null (intentional gap).

### stankonia-studios

**Confidence: flagged.** Bosstown origin, March 1998 purchase and ongoing professional studio supported. Corrected chronology: purchase preceded Aquemini release; removed unsupported first vocal/TLC remix, foreclosure and street nickname.

**Needs review:** “First thing made there” was inaccurate framing because the 1998 album preceded 2000 Stankonia. Album/production details retained except priority claim.

- [Evidence](https://solidstatelogic.com/media/stakonia-studios-installs-solid-state-logic-duality-fuse)
- [Evidence](https://www.mixonline.com/recording/facilities/stankonia-studios-upgrades-hitmaking-console)

Coordinate audit: [fresh Nominatim query](https://nominatim.openstreetmap.org/search?q=Stankonia+Studios+atlanta&format=jsonv2&addressdetails=1&limit=3) did not establish an exact named-site match (irrelevant results rejected). Existing coordinate/flag retained from the baseline; **fresh precision is unconfirmed**. Consult prior geocode updates and source address before relocating.

Final address: 677 Antone Street NW, Atlanta, GA 30318.

**SQL field changes:** `story_md`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.


Final image: null (intentional gap).

### chattahoochee-river

**Confidence: flagged.** Corrected municipal Riverside Park misidentification as federal NRA. Official closure notice: renovation until expected summer 2027. Removed unsupported causal claim that song helped clean river and unsourced award/video inventory.

**Needs review:** Pin is an editorial river-listening place, not a verified filming location or Jackson’s boyhood spot. 1993 song association retained; no lyric quote or environmental causal claim.

- [Evidence](https://www.roswellgov.com/facilities/riverside-park/)

Coordinate audit: [fresh Nominatim query](https://nominatim.openstreetmap.org/search?q=The+Chattahoochee+River+atlanta&format=jsonv2&addressdetails=1&limit=3) did not establish an exact named-site match (irrelevant results rejected). Existing coordinate/flag retained from the baseline; **fresh precision is unconfirmed**. Consult prior geocode updates and source address before relocating.

Final address: Riverside Park, 575 Riverside Road, Roswell, GA 30075.

**SQL field changes:** `address`, `story_md`, `what_is_there_now`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.

- `address`: Riverside Park, 575 Riverside Road, Roswell, GA 30075 (Chattahoochee River NRA) → Riverside Park, 575 Riverside Road, Roswell, GA 30075
- `what_is_there_now`: The Chattahoochee River NRA — paddle it, raft it, or walk the Roswell Riverwalk alongside it. Hotter than a hoochie coochie in July, as documented. → Riverside Park is closed for renovation, with reopening expected in summer 2027. Check the City of Roswell notice before planning any visit; this pin is not an open-access recommendation.

Retained/final image attribution: The Roswell stretch. Photo: JJonahJackalope, CC BY-SA 4.0, via Wikimedia Commons. [File provenance and license](https://commons.wikimedia.org/wiki/File:Roswell%2C%20Chattahoochee%20River%20National%20Recreation%20Area.jpg). Existing image provenance is inherited from update 10/12; this pass does not claim a new visual inspection of every retained file.

### ameris-bank-amphitheatre

**Confidence: flagged.** Current amphitheatre/address supported; exact-site 2025 amphitheatre photo supplied under CC0. Removed unsupported continuing ASO residency, attendance estimate and 30+ annual show guarantee.

**Needs review:** Historical May 10, 2008 opening/ASO bill, 12,000 capacity, 2019 renaming and named-artist recurrence retained for review; official current calendar alone does not prove those historical claims.

- [Evidence](https://www.amerisbankampatl.com/)
- [Evidence](https://commons.wikimedia.org/wiki/File:ABA2025.jpg)

Coordinate audit: [fresh Nominatim query](https://nominatim.openstreetmap.org/search?q=Ameris+Bank+Amphitheatre+atlanta&format=jsonv2&addressdetails=1&limit=3) did not establish an exact named-site match (irrelevant results rejected). Existing coordinate/flag retained from the baseline; **fresh precision is unconfirmed**. Consult prior geocode updates and source address before relocating.

Final address: 2200 Encore Parkway, Alpharetta, GA 30009.

**SQL field changes:** `what_is_there_now`, `story_md`, `image_url`, `image_attribution`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.

- `what_is_there_now`: Live Nation's busy north metro amphitheatre — 30+ shows a summer under the oaks off GA-400. → An active outdoor concert venue in Alpharetta. Check the official season calendar for performances, tickets, and lawn or pavilion options.
- `image_url`: None → https://upload.wikimedia.org/wikipedia/commons/3/3a/ABA2025.jpg
- `image_attribution`: None → Photo: Mbdfar, CC0, via Wikimedia Commons

Retained/final image attribution: Photo: Mbdfar, CC0, via Wikimedia Commons. [File provenance and license](https://commons.wikimedia.org/wiki/File:ABA2025.jpg). Existing image provenance is inherited from update 10/12; this pass does not claim a new visual inspection of every retained file.

### georgia-state-capitol

**Confidence: flagged.** March 7, 1979 performance distinguished from later state-song adoption. Removed unsupported long Fortson quotation, autobiographical reaction and Tutti Frutti bill anecdote. Label wording corrected without changing existing recording ID.

**Needs review:** Exact resolution wording and 1989 proposed replacement need legislative records; not retained as verified facts.

- [Evidence](https://www.georgiaencyclopedia.org/articles/arts-culture/ray-charles-1930-2004/m-4076/)
- [Evidence](https://www.georgiaencyclopedia.org/articles/arts-culture/ray-charles-1930-2004/)

Coordinate audit: [fresh Nominatim query](https://nominatim.openstreetmap.org/search?q=Georgia+State+Capitol+atlanta&format=jsonv2&addressdetails=1&limit=3) did not establish an exact named-site match (irrelevant results rejected). Existing coordinate/flag retained from the baseline; **fresh precision is unconfirmed**. Consult prior geocode updates and source address before relocating.

Final address: 206 Washington Street SW, Atlanta, GA 30334.

**SQL field changes:** `story_md`, `spotify_track_label`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.

- `spotify_track_label`: Listen: Ray Charles — "Georgia on My Mind" (made the state song in this building, Mar 7, 1979) → Ray Charles — Georgia on My Mind (1960)

Retained/final image attribution: Photo: atlexplorer, CC BY-SA 2.0, via Wikimedia Commons. [File provenance and license](https://commons.wikimedia.org/wiki/File:Dome%20of%20the%20Georgia%20State%20Capitol%20%283491661873%29.jpg). Existing image provenance is inherited from update 10/12; this pass does not claim a new visual inspection of every retained file.

### buckhead-theatre

**Confidence: flagged.** Current 3110 Roswell Road venue and former cinema/Roxy identity supported. Removed incorrect fixed 800 capacity and near-daily show guarantee.

**Needs review:** 1931 official history versus 1930 secondary dates unresolved: retained era 1931 and flagged. Lukas Nelson performance is Davis’s existing personal-memory anchor; exact event date and song-origin account not independently verified.

- [Evidence](https://www.thebuckheadtheatre.com/private-events)
- [Evidence](https://www.thebuckheadtheatre.com/)

Coordinate audit: named search `Buckhead Theatre atlanta` returned [The Buckhead Theatre](https://www.openstreetmap.org/way/887735886) at `33.8403347, -84.3799215`. Existing point retained; a building/area centroid is not automatically a better entrance or historical-site point.

Final address: 3110 Roswell Road NW, Atlanta, GA 30305.

**SQL field changes:** `what_is_there_now`, `story_md`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.

- `what_is_there_now`: An 800-cap Live Nation room on Roswell Road, hosting touring acts most nights of the week. → An active Live Nation venue on Roswell Road. Check the official calendar and event seating plan; capacity varies with configuration.

Retained/final image attribution: Photo: Keizers, CC BY-SA 3.0, via Wikimedia Commons. [File provenance and license](https://commons.wikimedia.org/wiki/File:Buckhead%20Theatre.JPG). Existing image provenance is inherited from update 10/12; this pass does not claim a new visual inspection of every retained file.

### ryman-auditorium

**Confidence: flagged.** 1892, Opry 1943–1974, December 1945 Scruggs and 1956 Cash/Carter meeting supported. Removed mutable award count/winter-run guarantee; corrected connection that implied backstage marriage.

**Needs review:** Largest auditorium regional superlative and verbatim marriage prediction not separately verified; retained as inherited narrative, flagged.

- [Evidence](https://www.ryman.com/history)
- [Evidence](https://www.ryman.com/story/johnny-and-june-love-within-the-ryman-walls)
- [Evidence](https://www.ryman.com/story/grand-ole-opry-1943-1974)

Coordinate audit: named search `Ryman Auditorium nashville` returned [Ryman Auditorium](https://www.openstreetmap.org/way/130905906) at `36.1612473, -86.7784951`. Existing point retained; a building/area centroid is not automatically a better entrance or historical-site point.

Final address: 116 Rep. John Lewis Way N, Nashville, TN 37219.

**SQL field changes:** `what_is_there_now`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.

- `what_is_there_now`: Fully restored and constantly booked — winner of Pollstar's Theater of the Year fourteen times. Tour by day, catch a show by night — the Opry still returns for winter runs. → An active performance venue with daytime tours. Check the Ryman and Opry calendars for current performances and access.

Retained/final image attribution: Photo: Daniel Schwen, CC BY-SA 3.0, via Wikimedia Commons. [File provenance and license](https://commons.wikimedia.org/wiki/File:Ryman%20Auditorium.jpg). Existing image provenance is inherited from update 10/12; this pass does not claim a new visual inspection of every retained file.

### tootsies-orchid-lounge

**Confidence: flagged.** Broadway address and operating honky-tonk supported.

**Needs review:** 1960 Hattie Bess purchase, IOU box, each named writer and exact Crazy/Charlie Dick demo handoff remain inherited claims requiring direct archival corroboration. Retained as flagged history, not newly certified.

- [Evidence](https://www.visitmusiccity.com/local-business/tootsies-orchid-lounge)

Coordinate audit: [fresh Nominatim query](https://nominatim.openstreetmap.org/search?q=Tootsie%27s+Orchid+Lounge+nashville&format=jsonv2&addressdetails=1&limit=3) did not establish an exact named-site match (irrelevant results rejected). Existing coordinate/flag retained from the baseline; **fresh precision is unconfirmed**. Consult prior geocode updates and source address before relocating.

Final address: 422 Broadway, Nashville, TN 37203.

No SQL location changes. Flagged inherited details are not being silently rewritten.

Retained/final image attribution: Photo: Kathleen Conklin, CC BY 2.0, via Wikimedia Commons. [File provenance and license](https://commons.wikimedia.org/wiki/File:Tootsies%20Orchid%20Lounge%20-%20Nashville.jpg). Existing image provenance is inherited from update 10/12; this pass does not claim a new visual inspection of every retained file.

### rca-studio-b

**Confidence: flagged.** 1957 studio, Elvis 200-plus songs and museum tours supported. Removed implication Dolly songs came from one session, untouched carpet/X and permission to touch piano.

**Needs review:** Exact Jolene session/studio and remaining song-by-song/Porter equipment details need session logs. Both Dolly song claims removed pending proof.

- [Evidence](https://www.countrymusichalloffame.org/experiences/studio-b/about-studio-b)
- [Evidence](https://www.countrymusichalloffame.org/experiences/studio-b/tour-studio-b)

Coordinate audit: named search `RCA Studio B nashville` returned [RCA Studio B](https://www.openstreetmap.org/way/422018714) at `36.1499750, -86.7928744`. Existing point retained; a building/area centroid is not automatically a better entrance or historical-site point.

Final address: 1611 Roy Acuff Place, Nashville, TN 37203.

**SQL field changes:** `what_is_there_now`, `story_md`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.

- `what_is_there_now`: Preserved and open for daily tours through the Country Music Hall of Fame — you can stand on Elvis's X and touch the piano he played. → Preserved studio with guided tours operated through the Country Music Hall of Fame and Museum. Book through the museum and follow the guide’s access rules.

Retained/final image attribution: Photo: Adinda Uneputty, CC BY-SA 2.0, via Wikimedia Commons. [File provenance and license](https://commons.wikimedia.org/wiki/File:RCA%20Studio%20B%20backdoor.jpg). Existing image provenance is inherited from update 10/12; this pass does not claim a new visual inspection of every retained file.

### quonset-hut

**Confidence: flagged.** Bradley studio and Belmont teaching use supported. Era narrowed to 1955; Crazy one-take account qualified as final vocal after earlier attempts, not entire session. Removed off-site console photo.

**Needs review:** Exact 1954/1955 development stages and whole artist roster need session-level records; next-door Studio A distinguished from Hut. Owen Bradley interview in March 1988 Mix is source for final-vocal distinction.

- [Evidence](https://news.belmont.edu/quonset-hut-celebration-draws-music-legends/)
- [Evidence](https://news.belmont.edu/historic-columbia-studio-a-reopens-as-educational-space-for-belmont-students/)
- [Evidence](https://www.worldradiohistory.com/Archive-All-Audio/Mix-Magazine/80s/Mix-1988-03.pdf)

Coordinate audit: [fresh Nominatim query](https://nominatim.openstreetmap.org/search?q=The+Quonset+Hut++nashville&format=jsonv2&addressdetails=1&limit=3) did not establish an exact named-site match (irrelevant results rejected). Existing coordinate/flag retained from the baseline; **fresh precision is unconfirmed**. Consult prior geocode updates and source address before relocating.

Final address: 34 Music Square East, Nashville, TN 37203.

**SQL field changes:** `era_start`, `image_url`, `image_attribution`, `story_md`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.

- `era_start`: 1954 → 1955
- `image_url`: https://upload.wikimedia.org/wikipedia/commons/d/d5/Owen_Bradley%27s_Quonset_Hut_Studio_console%2C_CMHF.jpg → None
- `image_attribution`: Owen Bradley's Quonset Hut console. Photo: Cliff, CC BY 2.0, via Wikimedia Commons → None

Final image: null (intentional gap).

### club-baron

**Confidence: flagged.** 1955 club, Little Richard appearances, 1963 Hendrix/Jones encounter and surviving Elks use supported. Hendrix military timeline clarified; no claim draft nomination equals listing.

**Needs review:** “Greatest”, Marbles nickname, precise house-gig chronology, Jones tribute intent and “only stage left” not all confirmed. Removed tribute-intent assertion; other inherited descriptions flagged.

- [Evidence](https://www.nashville.gov/departments/historic-preservation/programs/historical-markers/historic-sites)
- [Evidence](https://www.nashville.gov/sites/default/files/2025-11/DRAFT_Club_Baron_NRHP_Nomination_for_web_11_17_25_.pdf?ct=1763418715)

Coordinate audit: [fresh Nominatim query](https://nominatim.openstreetmap.org/search?q=Club+Baron++nashville&format=jsonv2&addressdetails=1&limit=3) did not establish an exact named-site match (irrelevant results rejected). Existing coordinate/flag retained from the baseline; **fresh precision is unconfirmed**. Consult prior geocode updates and source address before relocating.

Final address: 2614 Jefferson Street, Nashville, TN 37208.

**SQL field changes:** `story_md`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.


Final image: null (intentional gap).

### bluebird-cafe

**Confidence: flagged.** 1982 opening, in-the-round introduction in 1985, Brooks/Arata and Swift history supported. Corrected format date and removed absolute two-shows/90-seat current-note claim.

**Needs review:** Exact seating capacity and “twenty years later” interval are not reverified; replaced precise interval with “Years later”. “Built label around her” is interpretive.

- [Evidence](https://bluebirdcafe.com/about/history/)

Coordinate audit: [fresh Nominatim query](https://nominatim.openstreetmap.org/search?q=The+Bluebird+Cafe+nashville&format=jsonv2&addressdetails=1&limit=3) did not establish an exact named-site match (irrelevant results rejected). Existing coordinate/flag retained from the baseline; **fresh precision is unconfirmed**. Consult prior geocode updates and source address before relocating.

Final address: 4104 Hillsboro Pike, Nashville, TN 37215.

**SQL field changes:** `what_is_there_now`, `story_md`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.

- `what_is_there_now`: Still ninety seats, still two shows a night, still nearly impossible to get into — reservations vanish in minutes. Worth it. → An active, intimate songwriter venue with reserved shows and other scheduled programs. Check the official calendar and reservation rules for the specific night.

Retained/final image attribution: Inside the Bluebird. Photo: Missvain, CC0, via Wikimedia Commons. [File provenance and license](https://commons.wikimedia.org/wiki/File:Bluebird%20Cafe%20-%20June%202024%20-%20Sarah%20Stierch%2008.jpg). Existing image provenance is inherited from update 10/12; this pass does not claim a new visual inspection of every retained file.

### grand-ole-opry-house

**Confidence: flagged.** 1974 move, transplanted stage circle, 1925 broadcast lineage, Paisley May 28, 1999 debut/February 17, 2001 induction supported. Removed unverified invitation-count, Santa costumes, fishing story and exact jacket/letter account.

**Needs review:** Induction press release says 43 performances by induction, not necessarily contradicting 36 at invitation; omitted rather than called false. Public access to circle is tour-dependent.

- [Evidence](https://www.opry.com/artists/brad-paisley)
- [Evidence](https://ir.rymanhp.com/news-releases/news-release-details/grand-ole-opry-inducts-brad-paisley-newest-member)
- [Evidence](https://www.opry.com/)

Coordinate audit: named search `Grand Ole Opry House nashville` returned [Grand Ole Opry House](https://www.openstreetmap.org/way/285022928) at `36.2069577, -86.6918054`. Existing point retained; a building/area centroid is not automatically a better entrance or historical-site point.

Final address: 600 Opry Mills Drive, Nashville, TN 37214.

**SQL field changes:** `story_md`, `what_is_there_now`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.

- `what_is_there_now`: Active several nights weekly, with daytime backstage tours. Stand on the circle if they let you — everyone who matters has. → An active performance and broadcast venue with scheduled backstage tours. Confirm the show location and access details when booking.

Retained/final image attribution: Photo: public domain, via Wikimedia Commons. [File provenance and license](https://commons.wikimedia.org/wiki/File:Opry-house%2C%20Nashville.jpg). Existing image provenance is inherited from update 10/12; this pass does not claim a new visual inspection of every retained file.

### station-inn

**Confidence: flagged.** 1974 founding separated from 1978 move to present Gulch site. Current tickets/access made listing-specific.

**Needs review:** Individual Monroe/Gill appearances and unrestricted jam participation not independently reverified; existing genre superlatives are editorial.

- [Evidence](https://www.bluegrasshall.org/inductees/earl-j-t-gray/)
- [Evidence](https://stationinn.com/information/)

Coordinate audit: named search `Station Inn nashville` returned [The Station Inn](https://www.openstreetmap.org/node/4350388494) at `36.1525608, -86.7846399`. Existing point retained; a building/area centroid is not automatically a better entrance or historical-site point.

Final address: 402 12th Avenue South, Nashville, TN 37203.

**SQL field changes:** `story_md`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.


Retained/final image attribution: Photo: Nick Shields, CC BY 2.0, via Wikimedia Commons. [File provenance and license](https://commons.wikimedia.org/wiki/File:1920px-Station%20Inn%20Nashville%20%288729882676%29.jpg). Existing image provenance is inherited from update 10/12; this pass does not claim a new visual inspection of every retained file.

### hatch-show-print

**Confidence: flagged.** 1879 origin and current museum-complex working shop supported. Clarified era is business origin, not date at present address.

**Needs review:** Current-site 2013 relocation requires direct dated history before adding. All named historic clients and literal “same blocks” assertion not independently checked; narrowed absolute wording.

- [Evidence](https://www.hatchshowprint.com/about)
- [Evidence](https://www.hatchshowprint.com/)

Coordinate audit: [fresh Nominatim query](https://nominatim.openstreetmap.org/search?q=Hatch+Show+Print+nashville&format=jsonv2&addressdetails=1&limit=3) did not establish an exact named-site match (irrelevant results rejected). Existing coordinate/flag retained from the baseline; **fresh precision is unconfirmed**. Consult prior geocode updates and source address before relocating.

Final address: 224 Rep. John Lewis Way S, Nashville, TN 37203.

**SQL field changes:** `story_md`. The following before → after records enumerate all short-field changes; full revised stories are in SQL and their factual removals/corrections are described above.


Retained/final image attribution: The letterpress floor. Photo: Jeremy Thompson, CC BY 2.0, via Wikimedia Commons. [File provenance and license](https://commons.wikimedia.org/wiki/File:Hatch%20Show%20Print%20December%202019%20interior%20general%20view.jpg). Existing image provenance is inherited from update 10/12; this pass does not claim a new visual inspection of every retained file.

## New connections

### royal-peacock → stankonia-studios

OutKast filmed the 1998 Rosa Parks video at the Royal Peacock, connecting the Sweet Auburn club to the duo that bought and renamed Bosstown as Stankonia that year.

- [Relationship evidence](https://www.atlantahistorycenter.com/programs-events/public-programs/juneteenth/royal-peacock/)
- [Relationship evidence](https://solidstatelogic.com/media/stakonia-studios-installs-solid-state-logic-duality-fuse)
### the-dungeon → patchwerk-recording-studios

Organized Noize began in Rico Wade’s family basement and became early clients of Patchwerk’s Atlanta studio. The link is the production team moving between an informal creative home and a professional recording room.

- [Relationship evidence](https://www.mixonline.com/recording/from-urban-to-beyondpatchwerk-recording)
- [Relationship evidence](https://www.ajc.com/life/music-blog/outkasts-big-boi-to-offer-airbnb-stays-at-the-dungeon/PHJPWWT5XVE5DISQZW3PKMKSPM/)
### patchwerk-recording-studios → trap-music-museum

Patchwerk names T.I. among its artists. In 2018 he helped launch the Trap Music Museum around the fifteenth anniversary of Trap Muzik: a recording artist connecting a working studio to a public account of the scene.

- [Relationship evidence](https://patchwerk.com/index.php/company-info/about-us)
- [Relationship evidence](https://www.thefader.com/2018/09/22/ti-trap-museum-atlanta)
### anns-tic-toc → little-richard-house

Richard Penniman grew up in Pleasant Hill and performed at Ann’s Tic Toc as a teenager. The relocated childhood house and the nightclub marker trace the same young musician from neighborhood life to paid performance.

- [Relationship evidence](https://www.hmdb.org/m.asp?m=186758)
- [Relationship evidence](https://visitmacon.org/directory/the-little-richard-house-resource-center-things-to-do/)
### wcyb-farm-and-fun-time → birthplace-of-country-music-museum

Radio Bristol at the museum revived Farm and Fun Time, the program associated with WCYB’s broadcasts from the Hotel General Shelby. The marker remembers the earlier show; the museum’s station carries its name into new live performances.

- [Relationship evidence](https://birthplaceofcountrymusic.org/about/news/radio-bristol-wcyb-unveil-farm-and-fun-time-artifact-in-new-partnership-announcement/)
- [Relationship evidence](https://birthplaceofcountrymusic.org/radio/programs/farm-and-fun-time/)
### country-music-hall-of-fame → bristol-sessions-site

Jimmie Rodgers recorded at the Bristol Sessions in 1927 and joined the Country Music Hall of Fame’s first class in 1961. His plaque in Nashville leads back to the Bristol recordings that helped begin his recording career.

- [Relationship evidence](https://countrymusichalloffame.org/hall-of-fame/jimmie-rodgers)
### country-music-hall-of-fame → carter-family-fold

The original Carter Family entered the Country Music Hall of Fame in 1970. Janette Carter, daughter of A.P. and Sara, founded the Fold in 1974 to continue the family’s musical tradition in its home community.

- [Relationship evidence](https://countrymusichalloffame.org/hall-of-fame/carter-family)
- [Relationship evidence](https://www.southernfoodways.org/oral-history/carter-family-fold/)
### club-baron → little-richard-house

Little Richard performed at Nashville’s Club Baron, according to the city’s historical marker. His Macon childhood home and the surviving Jefferson Street club connect a hometown beginning to a specific stage on his touring circuit.

- [Relationship evidence](https://www.nashville.gov/departments/historic-preservation/programs/historical-markers/historic-sites)
- [Relationship evidence](https://visitmacon.org/directory/the-little-richard-house-resource-center-things-to-do/)

## Corrections propagated beyond story cards

The following connection and trail-stop replacements use the same pin-specific sources above. This prevents a corrected card from contradicting its trail. Existing connection pairs are upserted; they do not inflate the new-thread count.

- Connection `152-nassau-street` → `the-tabernacle`: Nearby downtown sites with different uses: Ralph Peer recorded local musicians on Nassau Street in 1923; the Tabernacle became a concert venue for the 1996 Olympics.
- Connection `152-nassau-street` → `bristol-sessions-site`: Ralph Peer recorded in Atlanta for OKeh in 1923 and in Bristol for Victor in 1927. The same producer connects these two early commercial recording ventures; neither marks the invention of all field recording.
- Connection `152-nassau-street` → `chattahoochee-river`: Fiddlin’ John Carson’s 1923 Atlanta recording and Alan Jackson’s 1993 Chattahoochee offer two Georgia country-music listening points. The river pin is an editorial setting, not the verified location of Jackson’s song or video.
- Connection `georgia-state-capitol` → `buckhead-theatre`: Ray Charles performed Georgia on My Mind for Georgia’s legislature in March 1979; it became the state song later that year. Lukas Nelson’s Forget About Georgia answers the familiar standard in the personal concert memory anchoring the Buckhead pin.
- Connection `bristol-sessions-site` → `carter-family-fold`: The Carter Family recorded at Bristol in 1927. Janette Carter, daughter of A.P. and Sara, later founded the Fold to continue the family’s music, with live shows during its concert season.
- Connection `tennessee-ernie-ford-birthplace` → `paramount-bristol`: Ford’s Bristol beginnings at the Anderson Street house connect to his part in the restored Paramount’s 1991 reopening story.
- Connection `douglass-theatre` → `capricorn-sound-studios`: Otis Redding performed in Douglass Theatre talent contests. His later work with manager Phil Walden helped build the Macon music business from which Capricorn emerged; a single discovery broadcast is not established here.
- Connection `douglass-theatre` → `macon-city-auditorium`: Otis Redding sang in talent contests at the Douglass. Macon gathered for his funeral at the City Auditorium on December 18, 1967.
- Connection `ryman-auditorium` → `carter-family-fold`: Johnny Cash and June Carter met at the Ryman in 1956. Cash later married into the Carter family and gave his final concert at the Carter Family Fold on July 5, 2003; the Ryman was their meeting place, not their wedding venue.
- Trail `atlanta-century`, `152-nassau-street`: 1923. Begin at the demolished site of Ralph Peer’s Atlanta recording venture. The recordings survive even though the room does not.
- Trail `atlanta-century`, `the-masquerade`: 1989. The venue began on North Avenue and moved to Underground Atlanta in 2016. Its present rooms include Heaven, Hell, Purgatory, and Altar.
- Trail `atlanta-century`, `eddies-attic`: 1991. Continue to Decatur for the listening room. Check the current concert and open-mic schedule before making the trip.
- Trail `atlanta-century`, `the-dungeon`: Explore this stop from the map: a private residential site associated with the Dungeon Family’s early work. It is not a doorstep destination.
- Trail `atlanta-century`, `stankonia-studios`: 1998. OutKast bought Bobby Brown’s former studio before Aquemini was released. End with a working room, not an assumed public tour.
- Trail `bristol-1927`, `paramount-bristol`: The theater opened in 1931 and returned after restoration in 1991, with Tennessee Ernie Ford part of its reopening story. Check tonight’s program.
- Trail `bristol-1927`, `burger-bar`: Pause at the historic diner site and its Hank Williams legend. For food today, the restaurant lists 120 Piedmont Avenue.
- Trail `bristol-1927`, `carter-family-fold`: The orbit epilogue: travel outside Bristol for a seasonal show in Poor Valley. Check the calendar; the regular season runs February–November.
- Trail `macon-soul-to-southern-rock`, `little-richard-house`: Begin at Little Richard’s relocated childhood home in Pleasant Hill. This is a neighborhood origin story, not a claim that he was born at this present address.
- Trail `macon-soul-to-southern-rock`, `douglass-theatre`: Hear the young Otis Redding through the story of local talent contests. The theater gave emerging performers an audience before national fame.
- Trail `macon-soul-to-southern-rock`, `macon-city-auditorium`: From early performances to a city’s farewell: Otis Redding’s funeral was held here on December 18, 1967.
- Trail `macon-soul-to-southern-rock`, `capricorn-sound-studios`: Continue to the studio opened in 1969 and restored by Mercer in 2019. Visit the museum during its hours; working studio access requires arrangements.
- Trail `nashville-mother-church`, `quonset-hut`: Continue to Music Row for the Bradley studio. Patsy Cline’s Crazy belongs to this room, but the familiar one-take story leaves out earlier work.
- Trail `nashville-mother-church`, `rca-studio-b`: Nearby Studio B connects familiar recordings to a real room. Guided tours are booked through the Country Music Hall of Fame and Museum.
- Trail `nashville-mother-church`, `station-inn`: Return to the Gulch for bluegrass. The Station Inn began in 1974 and moved here in 1978; check tonight’s ticket and jam-session arrangements.
- Macon city introduction: removed implication that Otis Redding cofounded the later Capricorn label. Mercer’s history distinguishes his work with Walden from the subsequent label/studio story.

## Image-gap retry and provenance limits

Searched Wikimedia Commons exact names and place variations for all seven original gaps on 2026-09-27. Commons API results supplied file descriptions, authors, and license metadata; original-image retrieval returned HTTP 403 in this environment. **Metadata verification is not a successful browser render test.** New files need live media QA after review/application. No unlicensed official-site photo was copied.

| Original gap | Decision |
|---|---|
| Ameris Bank Amphitheatre | Filled with [ABA2025.jpg](https://commons.wikimedia.org/wiki/File:ABA2025.jpg), Mbdfar, [CC0](https://creativecommons.org/publicdomain/zero/1.0/). Exact amphitheatre photographed during a 2025 concert. |
| Club Baron | Still blank; nomination/marker material gives identity but no independently reusable exact-site photo selected. |
| Criminal Records | Still blank; an L5 street-scene candidate included surrounding businesses and was not accepted without a clear subject check. |
| Grant’s Lounge | Still blank; Commons/API retry included rate limiting, and subsequent exact-name web search did not establish a licensed exact-site file. |
| Hard Rock Live Bristol | Still blank; a casino exterior is not enough to identify the actual performance room; promotional concert images not reused. |
| Stankonia Studios | Still blank; official equipment/artist publicity does not establish a reusable exterior/interior license. |
| The Dungeon | Still blank; publicity/Airbnb photographs lack established reusable rights. Private-home status does not justify substitute imagery. |

Four old substitutions are removed: Nassau’s John Carson portrait, Ford birthplace’s unrelated Ford publicity portrait, the off-site Quonset mixing console, and the generic Underground Atlanta entrance used for Masquerade. All are real historical associations but fail this request’s exact-site image rule. The Otis statue image shows the actual sculpture at its prior setting; its historical-location attribution is retained. The Carter Fold campus/cabin image and Rhythm & Roots downtown festival-footprint image remain site images, not substitute artist portraits.

Seven new blanks: Wax ’n’ Facts, Star Bar, WRFG, Trap Music Museum, Ann’s Tic Toc, Bell House, and WCYB marker. Six new exact-subject images are documented per pin above. Total intentional blanks: **17**.

## Rejected candidates

- **688 Club, Atlanta:** [Creative Loafing retrospective](https://creativeloafing.com/content-165784-atlanta-punk-a-reunion-for-688-and) supports its importance to 1980s punk/new wave. Precise surviving building/footprint and current use were not sufficiently verified in this pass; omit rather than place a guessed historical entrance. Variety, Star Bar and the record shops add the neighborhood’s independent-music infrastructure without claiming to replace 688’s story.
- **WERD:** deliberately removed in update 02. Not re-added. Royal Peacock’s existing story already carries the nearby radio context; no new source justifies overriding that choice here.
- **Ernest Tubb Record Shop:** worthwhile history, but current operation has changed repeatedly. [Official project journal](https://www.ernesttubbrecordshop.co/backstage) contains renovation-era material; [May 6, 2026 reporting](https://www.bizjournals.com/nashville/news/2026/05/06/ernest-tubb-record-shop-quietly-reopens-nashville.html) describes another reopening after a short-lived late-2025 return. Defer until its operating configuration and access are checked directly; do not label it simply closed based on 2022 news.
- **Printers Alley:** broad district lead; no single new address with a sufficiently developed, sourced person/recording story selected. Nashville’s three additions broaden the chapter more clearly.
- **Del Morocco:** important Jefferson Street venue, but original demolished-site footprint not verified. Club Baron already provides a surviving-room anchor. Do not put the Del Morocco story at Club Baron’s coordinates.
- **Grand Opera House, Macon:** [official visitor information](https://www.thegrandmacon.com/) supplies a strong cultural site, but named Nominatim searches failed and address searches returned conflicting points. Not included under the coordinate standard.
- **WIBB / James Brown demo:** promising recording-history lead, but the exact studio address for the relevant 1950s session was not verified. No pin placed at a modern station office or transmitter as a substitute.
- **Original WCYB hotel studio:** the demolished hotel is not located at the new marker pin. The adopted pin explicitly represents the photographed historical marker and explains the original studio was elsewhere.

## Spotify suggestions for Davis

No new IDs were guessed or introduced. The 13 new pins keep both track fields null. Existing 33 ID/label pairs are carried forward; they were **not all rechecked remotely** in this local pass. The sole edited old label removes the false state-song-adoption date: [Ray Charles — Georgia on My Mind, Original Master Recording](https://open.spotify.com/track/47mA6f44zxLtdATOoY7GjN) resolved to that exact recording on Spotify; its existing ID is unchanged.

| New pin | Editorial direction, pending exact-recording approval |
|---|---|
| Variety Playhouse | Choose a personally meaningful documented show, not an arbitrary touring act. |
| Wax ’n’ Facts | B-52’s, original DB single Rock Lobster; distinguish from the later album version. |
| Star Community Bar | Blacktop Rockets or Slim Chance & the Convicts; choose a recording tied to the local scene. |
| WRFG | A station-supported local blues recording or a properly licensed station session. |
| Ebenezer Heritage Sanctuary | A documented Ebenezer choir/organ recording; do not substitute an unrelated celebrity gospel performance. |
| Patchwerk | An exact recording with session credits documenting work at Patchwerk, not merely an artist who has visited. |
| Trap Music Museum | T.I., a selection from Trap Muzik (2003), after checking version and editorial suitability. |
| Country Music Hall of Fame | Jimmie Rodgers, The Soldier’s Sweetheart (1927 Bristol recording); confirm the exact transfer/master. Blue Yodel was recorded elsewhere. |
| Fisk Jubilee Hall | Fisk Jubilee Singers, with lineup/date identified; avoid an unrelated choir. |
| NMAAM | Let Davis choose an exhibition-linked recording rather than presenting one artist as the whole museum. |
| Ann’s Tic Toc | Little Richard, Miss Ann; exact master to confirm. |
| Bell House | Mike Mills’s Concerto for Violin, Rock Band and String Orchestra; verify performer/recording credits. |
| WCYB marker | A documented Farm and Fun Time Stanley Brothers performance, if legally and technically available; no generic studio track labeled as a broadcast. |

## Review and validation

- SQL files are transactional and use stable slugs for all IDs; location/trail/stop/connection upserts are repeat-safe. No Supabase mutation was performed.
- Local verification installs schema, four seeds, updates 01–14; repeats 13 and 14; compares all six tables including row IDs. It also checks the expected six-stop order, three new cross-city pairs, counts, link/status pairing and documented image gaps.
- Original app, Bristol fallback, and existing browser/PWA scripts are unchanged. Browser scripts encode the old pin counts; a temporary copy with the expanded count expectations was used for smoke testing. The new trail still requires the separate UI selection work noted above.
- For future reapplication or recovery, retain a full database export or purpose-built affected-row snapshot. The older `snapshot:phase1` exporter is too narrow for this change. Historical/coordinate flags remain open editorial review items.
- Apply order on a database already through update 12: **update_13_atlanta_depth.sql, then update_14_chapter_depth.sql**. Run live data/media verification and both viewport/PWA checks after application and before shipping.

### Checkpoint for Davis / a follow-up task

Repository: `/Users/davis/Music-Map`, personal Mac checkout. Branch `main`, base
revision `8afd5e6`. Davis authorized committing the content package to `main` and pushing it. The two SQL files,
this ledger, verifier, and four requested documentation files are the complete
repo change scope. No application source or local fallback changed.

Validation completed: `npm run lint`, `npm run build`, and
`npm run verify:data:local` passed. The last command proved clean installation
and exact repeat-safety of updates 13–14 in isolated PostgreSQL. All 13 new
stories are 150–300 words; neither SQL file contains UUID literals. The original research pass made no live writes; Davis subsequently applied
the migrations. Live data and remote image-file/Spotify resolution checks now
pass. PWA checks passed against the local production server using live data. Browser
image checks encountered `net::ERR_BLOCKED_BY_ORB` on the existing Ryman
Wikimedia image, causing its image and attribution elements to be hidden by the
existing error fallback. This remains an external-media validation limitation;
passing file-metadata checks is not proof that image bytes render. Production
deployment was not independently verified. PostgreSQL 17 was installed locally to
run the scratch checks; no persistent database service was enabled.

Davis applied the SQL and authorized committing/pushing this package. Next:
resolve flagged claims/coordinates and media choices as evidence becomes
available; separately scope the in-city trail selector and permanently update
browser-test expectations.
Instructions read: repository `AGENTS.md`, `CLAUDE.md`, `TODO-V2.md`, `db/README.md`,
schema, all seeds and updates through 12; workflow kit `PROJECTS.md`,
`SKILL-CATALOG.md`, and `prompts/DAILY-PROMPTS.md` §6. No additional skill applied.
