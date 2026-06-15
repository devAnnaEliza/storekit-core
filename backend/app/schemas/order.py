from pydantic import BaseModel, Field


class OrderItemCreate(BaseModel):
    product_id: int
    variant_id: int
    quantity: int = Field(gt=0)


class OrderCreate(BaseModel):
    items: list[OrderItemCreate]


class OrderItemResponse(BaseModel):
    id: int
    product_id: int
    variant_id: int
    product_name: str
    variant_name: str
    unit_price: float
    quantity: int

    class Config:
        from_attributes = True


class OrderResponse(BaseModel):
    id: int
    order_number: str
    total: float
    status: str
    items: list[OrderItemResponse] = []

    class Config:
        from_attributes = True