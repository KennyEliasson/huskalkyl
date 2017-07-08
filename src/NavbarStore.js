const NavbarStore = {
  collapsed: true,
  toggle () {
    this.collapsed = !this.collapsed;
  },
  close () {
    this.collapsed = false;
  }
};

export default NavbarStore;
