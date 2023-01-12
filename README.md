# desmos-3d

A converter I created for my Desmos 3D engine:  
[INSERT LINK HERE]()

## Usage

Requires `npm`

1. Clone the repo
2. Install dependencies
```bash
npm install
```
3. Write the list of polygons in `in.txt` (See [§ Syntax](#syntax))
4. Build
```bash
npm run build
```
5. Run
```bash
npm run start
```

## Syntax

The file `in.sh` can have as many lines as your computer can handle. Blank lines are ignored.

Comments:
```
# Comment
#Comment
```

Polygons:
```
[2 or more point indexes] [hex color] [opacity]
```
For example:
```
22 31 54 #ff0000 1
```

Show the Desmos folder `[DEBUG:] Show Points` to get the point indexes
