declare module "feather-icons" {
  interface FeatherAttributes {
    [key: string]: string | number
  }

  interface FeatherIcon {
    toSvg(attrs?: FeatherAttributes): string
  }

  interface FeatherIcons {
    [key: string]: FeatherIcon | undefined
  }

  const feather: {
    icons: FeatherIcons
    replace(): void
    toSvg(name: string, attrs?: FeatherAttributes): string
  }

  export default feather
}