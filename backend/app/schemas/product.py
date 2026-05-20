from pydantic import BaseModel


class ProductVariantResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True


class ProductResponse(BaseModel):
    id: int
    name: str
    description: str
    price: float
    image: str
    variants: list[ProductVariantResponse] = []

    class Config:
        from_attributes = True