-- =============================================================
-- UPDATE 08 — DISTRICTS (watercolor washes under the music blocks)
-- Soft polygon fills rendered like watercolor on the city maps.
-- Polygons are deliberately rough and hand-drawn — precision would
-- break the worn-atlas aesthetic.
-- =============================================================

create table districts (
  id      uuid primary key default uuid_generate_v4(),
  city_id uuid references cities(id) on delete cascade,
  name    text not null,
  geojson jsonb not null,                    -- GeoJSON Polygon geometry
  color   text not null default '#9b8a5a'    -- wash tint, hex
);

create index idx_districts_city on districts(city_id);

alter table districts enable row level security;
create policy "public read" on districts for select to anon, authenticated using (true);

insert into districts (city_id, name, geojson, color)
select c.id, v.name, v.geojson::jsonb, v.color
from (values
  -- ATLANTA -----------------------------------------------------
  ('atlanta', 'Sweet Auburn', '#b3893f', '{"type":"Polygon","coordinates":[[
    [-84.3870,33.7596],[-84.3795,33.7604],[-84.3713,33.7589],[-84.3641,33.7572],
    [-84.3646,33.7541],[-84.3737,33.7544],[-84.3800,33.7549],[-84.3868,33.7563],
    [-84.3870,33.7596]]]}'),
  ('atlanta', 'Little Five Points', '#8d6b94', '{"type":"Polygon","coordinates":[[
    [-84.3540,33.7665],[-84.3477,33.7676],[-84.3437,33.7649],[-84.3457,33.7607],
    [-84.3522,33.7611],[-84.3549,33.7634],[-84.3540,33.7665]]]}'),
  -- NASHVILLE ---------------------------------------------------
  ('nashville', 'Music Row', '#a85f5a', '{"type":"Polygon","coordinates":[[
    [-86.8000,36.1530],[-86.7905,36.1522],[-86.7882,36.1487],[-86.7895,36.1410],
    [-86.7926,36.1368],[-86.8005,36.1377],[-86.8023,36.1452],[-86.8000,36.1530]]]}'),
  ('nashville', 'Jefferson Street', '#5f7a93', '{"type":"Polygon","coordinates":[[
    [-86.8290,36.1710],[-86.8163,36.1697],[-86.8027,36.1690],[-86.7944,36.1684],
    [-86.7941,36.1655],[-86.8080,36.1659],[-86.8230,36.1668],[-86.8293,36.1683],
    [-86.8290,36.1710]]]}'),
  ('nashville', 'The Gulch', '#a98a4f', '{"type":"Polygon","coordinates":[[
    [-86.7892,36.1560],[-86.7820,36.1553],[-86.7800,36.1516],[-86.7836,36.1487],
    [-86.7896,36.1502],[-86.7905,36.1536],[-86.7892,36.1560]]]}'),
  ('nashville', 'Lower Broadway', '#b06a45', '{"type":"Polygon","coordinates":[[
    [-86.7832,36.1632],[-86.7747,36.1607],[-86.7741,36.1586],[-86.7783,36.1577],
    [-86.7838,36.1597],[-86.7832,36.1632]]]}'),
  -- BRISTOL -----------------------------------------------------
  ('bristol', 'State Street', '#7d8a5c', '{"type":"Polygon","coordinates":[[
    [-82.1930,36.5963],[-82.1838,36.5963],[-82.1769,36.5957],[-82.1766,36.5930],
    [-82.1853,36.5929],[-82.1932,36.5938],[-82.1930,36.5963]]]}'),
  -- MACON -------------------------------------------------------
  ('macon', 'The Capricorn Blocks', '#9c6b50', '{"type":"Polygon","coordinates":[[
    [-83.6302,32.8352],[-83.6243,32.8346],[-83.6228,32.8313],[-83.6262,32.8290],
    [-83.6308,32.8302],[-83.6315,32.8333],[-83.6302,32.8352]]]}')
) as v(city_slug, name, color, geojson)
join cities c on c.slug = v.city_slug;
