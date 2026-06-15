"""add stock quantity to variants

Revision ID: 39ea7b97be31
Revises: 38a4da6a6ecd
Create Date: 2026-06-12
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "39ea7b97be31"
down_revision: Union[str, Sequence[str], None] = "38a4da6a6ecd"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "product_variants",
        sa.Column(
            "stock_quantity",
            sa.Integer(),
            nullable=False,
            server_default="0",
        ),
    )

    op.alter_column(
        "product_variants",
        "stock_quantity",
        server_default=None,
    )


def downgrade() -> None:
    op.drop_column("product_variants", "stock_quantity")