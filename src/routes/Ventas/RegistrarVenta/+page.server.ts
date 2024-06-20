import type { Actions } from './$types';
import { z } from 'zod';


import { VentaService } from '../VentaService';
import type DTONewSale from '../DTONewSale';
import { json } from '@sveltejs/kit';

const newSaleSchema = z.object({
    customerName: z
        .string({ required_error: 'El nombre del Cliente es requerido' })
        .min(2)
        .max(64, { message: 'Name must be less than 64 characters' })
        .trim(),
    productId: z
		.coerce
        .number({ required_error: 'El producto es requerido' , message: "Debe seleccionar un producto"})
		.min(0),
    quantity: z
		.coerce
        .number({ required_error: 'La cantidad es requerida' })
        .min(0, { message: 'La cantidad ingresada debe ser mayor a 0' })
});

export const actions = {
	createSale: async ({ cookies, request }) => {
		
		const formData = Object.fromEntries(await request.formData());
		let newSale : DTONewSale;

		try {
			newSale = newSaleSchema.parse(formData);
		} catch (err) {
			let jsonerr = JSON.parse(err.message);
			return { success: false, formData: formData, formError: jsonerr.map(error => error.message).join(", ") };
		}

		try {
			await VentaService.sale.create(newSale);
		} catch (err) {
			return { success: false, formData: formData, formError: err.message }
		}		
		return { success: true, formData};
	},
} satisfies Actions;