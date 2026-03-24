{
  mkShell,
  nodePackages,
  pnpm,
}:
mkShell {
  packages = [
    nodePackages.nodejs
    pnpm
  ];
  shellHook = ''
    echo ${nodePackages.nodejs.version} > .nvmrc
  '';
}
