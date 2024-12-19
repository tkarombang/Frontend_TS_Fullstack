import { Product } from './apiService';

export  class ProductView {
    private tableBody: HTMLTableSectionElement;

    constructor(tableId: string) {
        const table = document.querySelector<HTMLTableSectionElement>(`#${tableId} tbody`);
        if (!table) {
            throw new Error(`Table with id '${tableId}' not found.`);
        }
        this.tableBody = table;
    }

    renderProducts(products: { id: number; name: string; price: number }[]): void {
        this.tableBody.innerHTML = ''; // Kosongkan tabel sebelum render ulang

        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
            `;
            this.tableBody.appendChild(row);
        });
    }
}


