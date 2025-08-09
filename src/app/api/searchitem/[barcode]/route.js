export async function GET(req, { params }) {
  const { barcode } = params;
  try {
    const response = await fetch(
      `https://world.openfoodfacts.net/api/v2/product/${barcode}/?fields=categories_tags`,
    );

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Response is empty or invalid" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const result = await response.json();
    const categories = result.product?.categories_tags;
    return new Response(JSON.stringify({ categories }), {
      status: 200,
      headers: { "Content-type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
