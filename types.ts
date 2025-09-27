
export interface SymbolCategory {
  name: string;
  symbols: string[];
}

// Fix: Added FancyFont interface
export interface FancyFont {
    name: string;
    description: string;
    map: { [key: string]: string };
}
