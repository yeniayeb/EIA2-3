namespace L05_Haushaltshilfe {

    export interface Produkt {
        name: string; 
        unit: string; 
        price: number; 
    }

    export interface Data {
        [category: string]: Produkt[]; 
    }

    export interface Element {
        name: string; 
    }

    export interface Extra {
        [choice: string]: Element[];
    }
}