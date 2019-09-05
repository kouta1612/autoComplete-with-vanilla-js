<?php

namespace App\Http\Controllers;

use App\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AutoCompleteController extends Controller
{
    public function index(Request $request)
    {
        $items = Item::fromSub(function ($query) {
            $query->select('jp_name','en_name','hiragana','katakana','parent_id')
                ->from('items')
                ->where('parent_id', 0)
                ->unionAll(
                    DB::table('items as item1')
                    ->join('items as item2', 'item2.parent_id', '=', 'item1.id')
                    ->select(DB::raw(
                        "CONCAT_WS(' ', item1.jp_name, item2.jp_name) as jp_name,
                        CONCAT_WS(' ', item1.en_name, item2.en_name) as en_name,
                        CONCAT_WS(' ', item1.hiragana, item2.hiragana) as hiragana,
                        CONCAT_WS(' ', item1.katakana, item2.katakana) as katakana,
                        item1.parent_id as parent_id"
                    ))
                    ->where('item1.parent_id', '<>', 0)
                );
            }, 'sub')->where('jp_name', 'LIKE', "%{$request->key}%")
                ->orWhere('en_name', 'LIKE', "%{$request->key}%")
                ->orWhere('hiragana', 'LIKE', "%{$request->key}%")
                ->orWhere('katakana', 'LIKE', "%{$request->key}%")
                ->latest('parent_id')
                ->get();

        return $items;
    }
}
