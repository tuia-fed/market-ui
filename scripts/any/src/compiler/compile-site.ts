function build() {}

function watch() {}

export async function compileSite(production: boolean = false) {
  if (production) {
    await build()
  } else {
    watch()
  }
}
