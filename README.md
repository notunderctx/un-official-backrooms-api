# Un-Official Backrooms api

![img](https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Backrooms_%28web_series%29.webp/300px-Backrooms_%28web_series%29.webp.png)

An api to get levels ,entities and objects from the backrooms wiki

## Getting Started

1.  Clone the repository using the following command: `git clone https://github.com/your-username/your-repo-name.git`
2.  Navigate into the project directory: `cd your-repo-name`
3.  Run `npm i` to install the dependencies: `npm i` 4. Run `npm run start`to start the application:`npm run start .
4.  Open [http://localhost:3000](http://localhost:3000) in your browser to view the application. `;

## Paths

### Levels

`http://localhost:3000/levels/69` response :

```json
{
"href": "http://backrooms-wiki.wikidot.com/level-6",
"title": "- \"Lights Out\"",
"description": "<p>Very little is known about the actual structure of <strong>Level 6</strong>, as the level is shrouded in total and complete darkness. No light permeates the level, and light sources brought into the level have no function. Navigation of <strong>Level 6</strong> is carried out by feeling one's way through the darkness, which has revealed that the level is comprised of a seemingly endless series of tight hallways made of a smooth, cold material (likely concrete.)</p><br><p>In addition to being permanently dark, <strong>Level 6</strong> is also eerily silent, akin to a soundproof room. To explore <strong>Level 6</strong> is to subject oneself to a slow journey through complete darkness, total silence, and utter .......................",
"images": [
 "http://backrooms-wiki.wdfiles.com/local--files/level-6/level6map.jpg",
 "http://backrooms-wiki.wdfiles.com/local--files/nav:side/twitter.png",
 "http://backrooms-wiki.wdfiles.com/local--files/nav:side/discord.png",
 "https://scp-wiki.wdfiles.com/local--files/nav:side/black.png",
 "http://www.wikidot.com/avatar.php?userid=5541037&amp;size=small&amp;timestamp=1731548281",
 "http://www.wikidot.com/avatar.php?userid=5722723&amp;size=small&amp;timestamp=1731548281",
 "http://www.wikidot.com/avatar.php?userid=5541037&amp;size=small&amp;timestamp=1731548281"
],
"level": "Level 6"
}
```

### Objects

`http://localhost:3000/objects/2` response

```json
{
"href": "http://backrooms-wiki.wikidot.com/object-2",
"title": "Object 2 - \"Level Key\"",
"description": "<p><strong>Level Keys</strong> are rare objects found across the Backrooms. Every level has its own key and there can be multiple keys 'belonging' to one level. Most <strong>Level Keys</strong> bear a resemblance to 20th ...................",
"images": [
 "http://backrooms-wiki.wikidot.com/local--files/object-2/Keys.jpg",
 "http://backrooms-wiki.wdfiles.com/local--files/nav:side/twitter.png",
 "http://backrooms-wiki.wdfiles.com/local--files/nav:side/discord.png",
 "https://scp-wiki.wdfiles.com/local--files/nav:side/black.png",
 "https://imgur.com/TpkJaiC.png",
 "http://www.wikidot.com/avatar.php?userid=3672751&amp;size=small&amp;timestamp=1730334085"
],
"level": "Object 2"
}
```

### Entities

`http://localhost:3000/entity/2` response

```json
{"href": "[http://backrooms-wiki.wikidot.com/entity-2](http://backrooms-wiki.wikidot.com/entity-2)","title": "- \"The Windows\"","description": "<p>The <strong>Windows</strong> are creatures in the shape of a <strong>Window</strong>. The <strong>Window</strong> has a figure inside, always pointing at the target. If the target is unaware of the creature, it will attack immediately. \"Windows\" will generally appear on <a href=\"/level-1\">Level 1</a> through <a href=\"/level-2\">Level 2</a>, although mainly on <a href=\"/level-1\">Level 1</a>. Some <strong>Windows</strong> are safe when there is no shadowy figure behind them. Some can lead to \"<a href=\"/level-1-5\">Level 1.5</a>\".</p><br><p>The <strong>Windows</strong> start by pointing in the direction of a Wanderer, and whispers telling the Wanderers to enter the <strong>Window</strong>. Once close enough, the Entity will grab you, and pull you in, even if the said <strong>Window</strong> is closed. It is rumored that it's just an empty void on the other side, even if it shows land on the other side.</p><br><p>These <strong>Windows</strong> can come in many different shapes and sizes, and the same goes for the Shadowy Figures behind them. The Shadowy Figure always looks human, and will whisper to Wanderers to lure them into its trap.</p><br><p>There currently is no actual first report about The <strong>Windows</strong> at the moment, but the group known as <a href=\"/the-lost\">The Lost</a> has referenced them as \"The Men Behind The Glass\".</p><br><p>« <a href=\"/entity-1\">Entity 1</a> | Entity 2 | <a href=\"/entity-3\">Entity 3</a> »</p><br><p>Cite this page as:</p><br><p>\"<a href=\"/entity-2\">Entity 2 - \"The Windows\"</a>\" by AnonymousFandom user, original concept by u/glassydude101, from the <a href=\"https://backrooms-wiki.wikidot.com\">Backrooms Wiki</a>. Source: <a href=\"https://backrooms-wiki.wikidot.com/entity-2\">https://backrooms-wiki.wikidot.com/entity-2</a>. Licensed under <a href=\"https://creativecommons.org/licenses/by-sa/3.0/\">CC-BY-SA-3.0</a>.</p><br><p>\"<a href=\"/entity-2\">Entity 2 - \"The Windows\"</a>\" by AnonymousFandom user, original concept by u/glassydude101, from the <a href=\"https://backrooms-wiki.wikidot.com\">Backrooms Wiki</a>. Source: <a href=\"https://backrooms-wiki.wikidot.com/entity-2\">https://backrooms-wiki.wikidot.com/entity-2</a>. Licensed under <a href=\"https://creativecommons.org/licenses/by-sa/3.0/\">CC-BY-SA-3.0</a>.</p><br>","images": ["[http://backrooms-wiki.wdfiles.com/local--files/entity-2/entity-2.jpg](http://backrooms-wiki.wdfiles.com/local--files/entity-2/entity-2.jpg)","[http://backrooms-wiki.wdfiles.com/local--files/nav:side/twitter.png](http://backrooms-wiki.wdfiles.com/local--files/nav:side/twitter.png)","[http://backrooms-wiki.wdfiles.com/local--files/nav:side/discord.png](http://backrooms-wiki.wdfiles.com/local--files/nav:side/discord.png)","[https://scp-wiki.wdfiles.com/local--files/nav:side/black.png](https://scp-wiki.wdfiles.com/local--files/nav:side/black.png)"],"level": "Entity 2"}
```

### Phenomenas

`http://localhost:3000/phenomena/2` response :

```json
{
"href": "http://backrooms-wiki.wikidot.com/phenomenon-2",
"title": "Phenomenon 2 - \"Blood Moons\"",
"description": "<p><a href=\"#side-bar\">≡</a></p><br><p><a href=\"/site-rules\">Site Rules</a></p><br><p><a href=\"/greenlight-policy\">Greenlight Policy</a></p><br><p><a href=\"http://backrooms-wiki.wikidot.com/forum/c-6898685/introductions\">Forum: Introduce Yourself</a></p><br><p><strong>Library</strong></p><br><p><a href=ormal-levels ..........",
"images": [
 "http://backrooms-wiki.wdfiles.com/local--files/nav:side/twitter.png",
 "http://backrooms-wiki.wdfiles.com/local--files/nav:side/discord.png",
 "https://scp-wiki.wdfiles.com/local--files/nav:side/black.png",
 "http://backrooms-sandbox-2.wdfiles.com/local--files/adikurtic1/RedRoom",
 "http://www.wikidot.com/avatar.php?userid=7976254&amp;size=small&amp;timestamp=1730334080"
],
"level": "Phenomenon 2"
}
```

### Search

`http://localhost:3000/search?query=bottle` response:

```json
{
"query": "bottle",
"results": [
 {
   "index": 39,
   "matches": {
     "href": "http://backrooms-wiki.wikidot.com/object-42",
     "title": "Object 42 - \"Lightning In a Bottle\"",
     "description": "<p>Bottled Lightning is an electric charge of an estimated one billion (1,000,000,000) joules, which can be found in several Levels of The Backrooms, stored in glass containers, such as flasks, wine bottles, and many others. Despite the fact that these containers are usually made of glass, they can contain the lightning without the c ............",
     "images": [
       "http://backrooms-wiki.wdfiles.com/local--files/nav:side/twitter.png",
       "http://backrooms-wiki.wdfiles.com/local--files/nav:side/discord.png",
       "https://scp-wiki.wdfiles.com/local--files/nav:side/black.png",
       "http://www.wikidot.com/avatar.php?userid=6864497&amp;size=small&amp;timestamp=1730334085",
       "http://www.wikidot.com/avatar.php?userid=7331266&amp;size=small&amp;timestamp=1730334085"
     ],
     "level": "Object 42"
   }
 }
]
}
```

### errors

```json
{"error": "phenomena number : 2 not found"}
```
