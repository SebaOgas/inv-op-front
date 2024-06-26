
import { VentaService } from '../VentaService';

export const load = async ({ params }) => {
    return {
        ventaId: params.ventaId,
        sale: await VentaService.sale.get(params.ventaId)
    }
}