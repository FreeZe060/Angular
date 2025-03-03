import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product-service.service';
import { Product } from '../product';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
	selector: 'app-cart-page',
  imports: [RouterLink, CommonModule],
	template: `
    <section>
      <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 min-h-screen">
        <div class="mx-auto max-w-3xl">
          <header class="text-center">
            <h1 class="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
          </header>

          <div class="mt-8">
            @if (cartItems.length > 0) {
              <ul class="space-y-6">
                @for (item of cartItems; track item) {
                  <li class="flex items-center gap-6 border p-6 rounded-md shadow-md">
                    <img [src]="item.product.img" alt="{{ item.product.name }}" class="w-20 h-20 rounded-lg object-cover" />
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900 ">{{ item.product.name }}</h3>
                      <dl class="mt-2 space-y-2 text-sm text-gray-600">
                        <div>
                          <dt class="inline font-semibold">Prix : </dt>
                          <dd class="inline">{{ item.product.price }}€</dd>
                        </div>
                      </dl>
                    </div>

                    <div class="flex flex-1 items-center justify-end gap-4">
                      <form>
                        <label for="LineQty" class="sr-only">Quantity</label>
                        <input
                          type="number"
                          min="1"
                          [value]="item.quantity"
                          id="LineQty"
                          class="h-10 w-16 rounded border-gray-300 bg-gray-50 p-2 text-center text-sm text-gray-700"
                          (input)="updateItemQuantity(item.product.id, $event)"
                        />

                      </form>

                      <button
                        class="text-gray-700 transition hover:text-red-600"
                        (click)="removeItemFromCart(item.product.id)"
                      >
                        <span class="sr-only">Remove item</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 2.25h6M4.5 6.75h15m-1.5 0-1.125 14.25H6.375L5.25 6.75m3 0v-2.25m7.5 2.25v-2.25"
                          />
                        </svg>
                      </button>
                    </div>
                  </li>
                }
              </ul>

              <div class="mt-8 flex justify-end border-t border-gray-200 pt-8">
                <div class="w-screen max-w-lg space-y-4">
                  <dl class="space-y-2 text-base text-gray-800">
                    <div class="flex justify-between">
                      <dt>Sous-Total</dt>
                      <dd>{{ subtotal }}€</dd>
                    </div>

                    <div class="flex justify-between">
                      <dt>Taxe</dt>
                      <dd>{{ vat }}€</dd>
                    </div>

                    <div class="flex justify-between text-lg font-medium">
                      <dt>Total</dt>
                      <dd>{{ total }}€</dd>
                    </div>
                  </dl>

                  <div class="flex justify-end cursor-pointer">
                    <a
                      routerLink="/checkout"
                      class="block rounded bg-gray-700 px-5 py-3 text-base text-gray-100 transition hover:bg-gray-600"
                    >
                      Checkout
                    </a>
                  </div>
                </div>
              </div>
            } @else {
              <ng-template #emptyCart>
                <div class="text-center text-gray-600">Your cart is empty</div>
              </ng-template>
            }
          </div>
        </div>
      </div>
    </section>
  `,
	styles: [],
})

export class CartPageComponent implements OnInit {
	cartItems: { product: Product; quantity: number }[] = [];
	subtotal: number = 0;
	vat: number = 0;
	discount: number = 0;
	total: number = 0;

	constructor(private productService: ProductService) { }

	ngOnInit() {
		this.productService.cart$.subscribe((cartItems: { product: Product; quantity: number }[]) => {
			this.cartItems = cartItems;
			this.calculateTotals();
		});
	}

	trackById(index: number, item: { product: Product }) {
		return item.product.id;
	}

	removeItemFromCart(productId: number) {
		this.productService.removeFromCart(productId);
	}

	updateItemQuantity(productId: number, event: Event) {
		const input = event.target as HTMLInputElement;
		const quantity = parseInt(input.value, 10);

		if (isNaN(quantity) || quantity <= 0) {
			this.removeItemFromCart(productId);
		} else {
			const product = this.productService.getProduct(productId);
			if (product) {
				this.productService.addToCart(product, quantity);
			}
		}
	}

	calculateTotals() {
		this.subtotal = this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
		this.vat = parseFloat((this.subtotal * 0.2).toFixed(2));
		this.discount = 0;
		this.total = parseFloat((this.subtotal + this.vat - this.discount).toFixed(2));
	}
}