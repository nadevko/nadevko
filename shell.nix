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
}
