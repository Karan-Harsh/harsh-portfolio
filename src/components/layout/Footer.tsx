export default function Footer() {
  return (
    <footer className="border-t border-border/50">
      <div className="container py-8 text-sm text-muted-foreground">
        © {new Date().getFullYear()} Harsh Karan. All rights reserved.
      </div>
    </footer>
  );
}
