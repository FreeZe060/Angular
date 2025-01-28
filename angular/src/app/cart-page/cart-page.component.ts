import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product-service.service';
import { Product } from '../product';

@Component({
	selector: 'app-cart-page',
	imports: [],
	template: `
    <section>
      <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div class="mx-auto max-w-3xl">
          <header class="text-center">
            <h1 class="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
          </header>

          <div class="mt-8">
            @if (cartItems.length > 0){
              <ul class="space-y-4">
                <li class="flex items-center gap-4">
                  @for (item of cartItems; track item) {
                    <img [src]="item.img" alt="{{ item.name }}" class="size-16 rounded object-cover" />
                    <div>
                      <h3 class="text-sm text-gray-900">{{ item.name }}</h3>
                      <dl class="mt-0.5 space-y-px text-[10px] text-gray-600">
                        <div>
                          <dt class="inline">Price:</dt>
                          <dd class="inline">{{ item.price }}€</dd>
                        </div>
                      </dl>
                    </div>
    
                    <div class="flex flex-1 items-center justify-end gap-2">
                      <form>
                        <label for="LineQty" class="sr-only">Quantity</label>
                        <input
                          type="number"
                          min="1"
                          value="1"
                          id="LineQty"
                          class="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600"
                        />
                      </form>
    
                      <button class="text-gray-600 transition hover:text-red-600" (click)="removeItemFromCart(item.id)">
                        <span class="sr-only">Remove item</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-4"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  }
                </li>
              </ul>
  
              <div class="mt-8 flex justify-end border-t border-gray-100 pt-8">
                <div class="w-screen max-w-lg space-y-4">
                  <dl class="space-y-0.5 text-sm text-gray-700">
                    <div class="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd>{{ subtotal }}€</dd>
                    </div>
  
                    <div class="flex justify-between">
                      <dt>VAT</dt>
                      <dd>{{ vat }}€</dd>
                    </div>
  
                    <div class="flex justify-between">
                      <dt>Discount</dt>
                      <dd>-{{ discount }}€</dd>
                    </div>
  
                    <div class="flex justify-between !text-base font-medium">
                      <dt>Total</dt>
                      <dd>{{ total }}€</dd>
                    </div>
                  </dl>
  
                  <div class="flex justify-end">
                    <a
                      href="#"
                      class="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                    >
                      Checkout
                    </a>
                  </div>
                </div>
              </div>
            } 
            @else{
              <ng-template #emptyCart>
                <div class="text-center text-gray-600">Your cart is empty</div>
              </ng-template>
            }
          </div>

        </div>
      </div>
    </section>
  `,
  styles: ``
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
		this.subtotal = this.cartItems.reduce((total, item) => total + item.price, 0);
		this.vat = this.subtotal * 0.2;
		this.discount = 0;
		this.total = this.subtotal + this.vat - this.discount;
	}
}
