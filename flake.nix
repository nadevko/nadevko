{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

    n = {
      url = "github:nadevko/nabiki/v1.0";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    treefmt-nix = {
      url = "github:numtide/treefmt-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    {
      self,
      treefmt-nix,
      n,
      nixpkgs,
    }:
    n nixpkgs.lib.platforms.linux (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        treefmt = treefmt-nix.lib.evalModule pkgs {
          programs.nixfmt = {
            enable = true;
            strict = true;
          };
          programs.prettier.enable = true;
        };
      in
      {
        formatter = treefmt.config.build.wrapper;
        checks.treefmt = treefmt.config.build.check self;
      }
    );
}
