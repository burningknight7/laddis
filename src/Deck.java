package src;
interface Deck {

  void shuffle();

  void sort();

  void sort(Comparator<Card> comparator);

  void filter(Predicate<Card> predicate);

  Card drawCard();

  Card drawCardFrom(int index);

  void putCard(Card card);

  void putCardAt(int index, Card card);

  int size();

}
