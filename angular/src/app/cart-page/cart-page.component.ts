import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product-service.service';
import { Product } from '../product';

@Component({
  selector: 'app-cart-page',
  template: `
    <section>
      <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div class="mx-auto max-w-3xl">
          <header class="text-center">
            <h1 class="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
          </header>

          <div class="mt-8">
            @if (cartItems.length > 0) {
              <ul class="space-y-6">
                @for (item of cartItems; track item) {
                  <li class="flex items-center gap-6 border p-6 rounded-md shadow-md">
                    <img [src]="item.img" alt="{{ item.name }}" class="w-20 h-20 rounded-lg object-cover" />
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900 font-serif">{{ item.name }}</h3>
                      <dl class="mt-2 space-y-2 text-sm text-gray-600">
                        <div>
                          <dt class="inline font-semibold">Price : </dt>
                          <dd class="inline">{{ item.price }}€</dd>
                        </div>
                      </dl>
                    </div>

                    <div class="flex flex-1 items-center justify-end gap-4">
                      <form>
                        <label for="LineQty" class="sr-only">Quantity</label>
                        <input
                          type="number"
                          min="1"
                          value="1"
                          id="LineQty"
                          class="h-10 w-16 rounded border-gray-300 bg-gray-50 p-2 text-center text-sm text-gray-700"
                        />
                      </form>

                      <button
                        class="text-gray-700 transition hover:text-red-600"
                        (click)="removeItemFromCart(item.id)"
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
                      <dt>Subtotal</dt>
                      <dd>{{ subtotal }}€</dd>
                    </div>

                    <div class="flex justify-between">
                      <dt>VAT</dt>
                      <dd>{{ vat }}€</dd>
                    </div>

                    <div class="flex justify-between text-lg font-medium">
                      <dt>Total</dt>
                      <dd>{{ total }}€</dd>
                    </div>
                  </dl>

                  <div class="flex justify-end">
                    <a
                      href="#"
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
	cartItems: Product[] = [];
	subtotal: number = 0;
	vat: number = 0;
	discount: number = 0;
	total: number = 0;

	constructor(private productService: ProductService) { }

	ngOnInit() {
    this.productService.cart$.subscribe((cartItems: { product: Product; quantity: number; }[]) => {
      this.cartItems = cartItems.map(item => item.product);
      this.calculateTotals();
    });
	}

	removeItemFromCart(productId: number) {
		this.productService.removeFromCart(productId);
	}

	calculateTotals() {
    this.subtotal = parseFloat(
      this.cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)
    );
    this.vat = parseFloat((this.subtotal * 0.2).toFixed(2));
    this.discount = parseFloat(this.discount.toFixed(2)); // Si discount est modifié ailleurs
    this.total = parseFloat((this.subtotal + this.vat - this.discount).toFixed(2));
  }  
}
