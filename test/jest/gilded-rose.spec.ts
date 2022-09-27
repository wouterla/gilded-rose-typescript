import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('Basic item quality should decrease', () => {
    const gildedRose = new GildedRose([new Item('+5 Dexterity Vest', 5, 7)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(6);
    expect(items[0].sellIn).toBe(4);
  });

  it('Basic item quality should decrease double after sell-in', () => {
    const gildedRose = new GildedRose([new Item('+5 Dexterity Vest', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);
    expect(items[0].sellIn).toBe(-1);
  });

  it('Basic item quality never becomes negative', () => {
    const gildedRose = new GildedRose([new Item('+5 Dexterity Vest', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-1);
  });

  it('Brie item quality increases with age', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 5, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(2);
    expect(items[0].sellIn).toBe(4);
  });

  it('Brie item quality never goes above 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 5, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
    expect(items[0].sellIn).toBe(4);
  });

  it('Backstage passes increase quality by 1 with sell in over 10', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 11, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(21);
  });

  it('Backstage passes increase quality by 2 with sell in between 5 and 10', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 6, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(22);
  });

  it('Backstage passes increase quality by 3 with sell in between 0 and 5', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(23);
  });

  it('Backstage passes quality is 0 after concert', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it('Sulfuras item quality and selling do not change', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 5, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(5);
  });

  // it('Conjured items go twice as fast before sell-in', () => {
  //   const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 5, 20)]);
  //   const items = gildedRose.updateQuality();
  //   expect(items[0].quality).toBe(18);
  // });
  //
  // it('Conjured items go twice as fast after sell-in', () => {
  //   const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 20)]);
  //   const items = gildedRose.updateQuality();
  //   expect(items[0].quality).toBe(16);
  // });

});
