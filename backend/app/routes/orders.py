from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.order import Order, OrderItem
from app.models.product import Product
from app.models.product_variant import ProductVariant
from app.schemas.order import OrderCreate, OrderResponse

router = APIRouter(
    prefix="/orders",
    tags=["Orders"],
)


@router.post(
    "/",
    response_model=OrderResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_order(payload: OrderCreate, db: Session = Depends(get_db)):
    if not payload.items:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="O pedido precisa ter pelo menos um item.",
        )

    order_items_data = []
    total = 0

    for item in payload.items:
        product = (
            db.query(Product)
            .filter(Product.id == item.product_id)
            .first()
        )

        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Produto não encontrado.",
            )

        variant = (
            db.query(ProductVariant)
            .filter(
                ProductVariant.id == item.variant_id,
                ProductVariant.product_id == item.product_id,
            )
            .first()
        )

        if not variant:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Variação não encontrada para o produto {product.name}.",
            )

        if variant.stock_quantity < item.quantity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=(
                    f"Estoque insuficiente para {product.name} "
                    f"no tamanho {variant.name}. "
                    f"Disponível: {variant.stock_quantity}."
                ),
            )

        total += product.price * item.quantity

        order_items_data.append(
            {
                "product": product,
                "variant": variant,
                "quantity": item.quantity,
            }
        )

    order = Order(
        order_number=f"ROC-{uuid4().hex[:4].upper()}",
        total=total,
        status="pending",
    )

    db.add(order)
    db.flush()

    for item_data in order_items_data:
        product = item_data["product"]
        variant = item_data["variant"]
        quantity = item_data["quantity"]

        variant.stock_quantity -= quantity

        order_item = OrderItem(
            order_id=order.id,
            product_id=product.id,
            variant_id=variant.id,
            product_name=product.name,
            variant_name=variant.name,
            unit_price=product.price,
            quantity=quantity,
        )

        db.add(order_item)

    db.commit()
    db.refresh(order)

    return order