# Movements
`zz` - put current line in the *center* of the **screen**  
`zt` - put current line at the *top* of the **screen**  
`zb` - put current line at the *bottom* of the **screen**  

`H/L` - go to the *top/bottom* of the **screen**  

`{/}` - move *up/down* a **paragraph**

`w/e` - go to the *beginning/end* of the **next word** 

`<'int'>%` - go to the `int` percent of the document
	
`0` - go to the *beggining* of a current **line**  
`^` - go to the *beggining* of the **text** in current line  

# Deletion commands
> *Note: **every** motion with `d` works with `c` as well* 

`D` - delete to the *end* of the **line**

`d{/}` - delete a **paragraph** *above/belove* the cursor

`dw` - put a cursor at the *beginning* of the **next word** after deletetion of a current one  
`de` - put a cursor *before* the **next word** leaving one extra space  

`di<'obj'>` - delete *everything* **[i]nside** the text object  
`da<'obj'>` - delete *everything* **"[a]round"** the text object (everything inside + the object itself)         
`'obj'`:
  - `w` - [w]ord   
    > *Note:        `diw` puts a cursor **before the next word** leaving an extra whitespace, whereas*  
    > *&emsp;&emsp; `daw` puts a cursor **at the beggining of the next word***. <!-- &emsp; is TAB in HTML -->
  - `p` - [p]aragraph
  - `(/)` 
  - `{/}`
  - `[/]`
  - `</>`
    > *Note: either of opening/closing objects work.*
  - `"`
  - `'`
  - `
    > *Note: if the cursor is **before** quotes in a current line, this command will still work.*

# Commands
### Substitute
`<s/'old'/'new'/<'opt'>`

# Miscellaneous
`ZZ` - save and quit  
`ZQ` - quit without saving 

`U` - undo changes on a **whole line**  
`:earlier <'time'>` - undo changes from some `time` ago  
`:later <'time'>` - redo changes from some `time` ago  
> *Example: `:earlier 10m` undoes everything was changed during the past 10 minutes.*  
