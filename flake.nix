{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

    kasumi = {
      url = "https://codeberg.org/api/v1/repos/nadevko/kasumi/archive/cc0a6826be2c4c4c6a419d7b420980b5d58bebca.tar.gz";
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
      kasumi,
      nixpkgs,
      treefmt-nix,
    }:
    let
      k = kasumi.lib;
      ko = kasumi.overlays;
      so = self.overlays;
    in
    {
      overlays.environment = k.foldLay [
        ko.compat
        ko.default
      ];
      packages = k.forAllPkgs nixpkgs { } (_: { });

      legacyPackages = k.importPkgsForAll nixpkgs { overlays = [ so.environment ]; };

      devShells = k.forAllPkgs self { } (pkgs: {
        default = pkgs.callPackage ./shell.nix { };
      });

      inherit
        (
          k.forAllPkgs self { } (
            pkgs:
            let
              treefmt = treefmt-nix.lib.evalModule self.legacyPackages.x86_64-linux {
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
          )
          |> k.transposeAttrs
        )
        formatter
        checks
        ;
    };
}
