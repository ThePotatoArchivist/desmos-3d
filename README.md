# desmos-3d

A converter I created for my Desmos 3D engine:  
https://www.desmos.com/calculator/lpe1hwpbvx

**UPDATE:** Instead of cloning and running the code, youc an also use the web processor at https://josiahfu.github.io/desmos-3d

## Syntax

The input can have as many lines as your computer can handle. Blank lines are ignored.

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
