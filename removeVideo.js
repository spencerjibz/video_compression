//;
import { readdirSync, unlink } from "fs"
import { promisify } from "util"
let unlinkPromise = promisify(unlink)

let dirToEmpty = process.argv[2]

// read the  all the contents of the dir  and delete each;

try {
	let files = readdirSync(dirToEmpty)
	files.forEach(async (v) => {
		  await unlinkPromise(`${dirToEmpty}/${v}`)
         
	})
} catch (err) {
	console.log(err)
}
