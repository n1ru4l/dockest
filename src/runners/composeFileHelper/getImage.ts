const getImage = ({ build, image }: { build?: string; image?: string }): { image: string } | {} | void => {
  /**
   * If user provided an image via interface
   */
  if (typeof image === 'string' && image.length > 0) {
    return {
      image,
    }
  }

  /**
   * If user provided a build path to a Dockerfile
   */
  if (build) {
    return {}
  }
}

export default getImage
