function generateStaticParams() {}

function Tour({ params }: { params: { slug: string } }) {
  console.log(params);
  return <div></div>;
}

export default Tour;
