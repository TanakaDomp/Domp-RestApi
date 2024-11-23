// custom 

const o = (src, async = true) => {
  const script = document.createElement("script")
  script.src = src
  script.async = async
  return script
}

export default o