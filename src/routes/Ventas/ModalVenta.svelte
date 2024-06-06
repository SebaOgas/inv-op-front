<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import type DTOSale from './DTOSale';

	export let open = false;
	export let showBackdrop = true;
	export let onClosed;

	export let sale: DTOSale;

	const modalClose = (data,sale) => {
		open = false;
		if (onClosed) {
			onClosed(data,sale);
		}
	};
</script>

{#if open}
	<div
		class="modal"
		id="sampleModal"
		tabindex="-1"
		role="dialog"
		aria-labelledby="sampleModalLabel"
		aria-hidden={false}
	>
		<div
			class="modal-dialog"
			role="document"
			in:fly={{ y: -50, duration: 300 }}
			out:fly={{ y: -50, duration: 300, easing: quintOut }}
		>
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="sampleModalLabel">Detalle de Venta</h5>
					<button
						type="button"
						class="close"
						data-dismiss="modal"
						aria-label="Close"
						on:click={() => modalClose('close')}
					>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<slot>
						<div class="form-group row">
							<label for="customerName" class="col-sm-4 col-form-label">Cliente</label>
							<div class="col-sm-8">
								<input
									type="text"
									readonly
									class="form-control-plaintext"
									id="customerName"
									value={sale.customerName}
								/>
							</div>
						</div>
						<div class="form-group row">
							<label for="saleDate" class="col-sm-4 col-form-label">Fecha de Venta</label>
							<div class="col-sm-8">
								<input
									type="text"
									readonly
									class="form-control-plaintext"
									id="saleDate"
									value={sale.saleDate}
								/>
							</div>
						</div>
						<div class="form-group row">
							<label for="productName" class="col-sm-4 col-form-label">Producto</label>
							<div class="col-sm-8">
								<input
									type="text"
									readonly
									class="form-control-plaintext"
									id="productName"
									value={sale.productName}
								/>
							</div>
						</div>
						<div class="form-group row">
							<label for="quantity" class="col-sm-4 col-form-label">Cantidad</label>
							<div class="col-sm-8">
								<input
									type="text"
									readonly
									class="form-control-plaintext"
									id="quantity"
									value={sale.quantity}
								/>
							</div>
						</div>
					</slot>
				</div>
				<div class="modal-footer">
					<button
						type="button"
						class="btn btn-secondary"
						data-dismiss="modal"
						on:click={() => modalClose('close', sale)}>Cerrar</button
					>
					<button type="button" class="btn btn-primary" on:click={() => modalClose('save', sale)}
						>Save changes</button
					>
				</div>
			</div>
		</div>
	</div>
	{#if showBackdrop}
		<div class="modal-backdrop show" transition:fade={{ duration: 150 }} />
	{/if}
{/if}

<style>
	.modal {
		display: block;
	}
</style>
