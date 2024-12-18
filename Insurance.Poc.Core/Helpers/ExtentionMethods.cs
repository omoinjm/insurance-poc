using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;

namespace Insurance.Poc.Core.Helpers;

public static class ExtentionMethods
{

    public static string ToCommaSeparatedList(this string[] items)
    {
        string ret = string.Empty;

        if (items != null)
        {

            foreach (var item in items)
            {
                ret += string.Format("{0},", item);
            }
        }

        return ret;
    }

    /// <summary>ated by Chat GPT
    /// </summary>
    /// <param name="html"></param>
    /// <returns></returns>
    public static string StripHtml(this string html)
    {
        // Remove HTML tags

        string strippedHtml = Regex.Replace(html, "<.*?>", string.Empty);

        // Decode HTML entities
        strippedHtml = HttpUtility.HtmlDecode(strippedHtml);

        // Remove leading and trailing white spaces
        strippedHtml = strippedHtml.Trim();

        // Remove consecutive white spaces
        strippedHtml = Regex.Replace(strippedHtml, @"\s+", " ");

        return strippedHtml;
    }

    public static string StripHtmlAndCss(this string html)
    {
        if (html == null) return string.Empty;

        // Remove HTML tags and CSS styles
        string strippedHtml = Regex.Replace(html, @"<style>[\s\S]*?</style>|<.*?>", string.Empty);

        // Decode HTML entities
        strippedHtml = HttpUtility.HtmlDecode(strippedHtml);

        // Remove leading and trailing white spaces
        strippedHtml = strippedHtml.Trim();

        // Remove consecutive white spaces
        strippedHtml = Regex.Replace(strippedHtml, @"\s+", " ");

        return strippedHtml;
    }


    public static string FirstCharToUpper(this string input)
    {
        switch (input)
        {
            case null: throw new ArgumentNullException(nameof(input));
            case "": throw new ArgumentException($"{nameof(input)} cannot be empty", nameof(input));
            default: return input[0].ToString().ToUpper() + input.Substring(1);
        }
    }

    public static string ToCommaSeparatedList(this int[] items)
    {
        string ret = string.Empty;

        if (items != null)
        {

            foreach (var item in items)
            {
                ret += string.Format("{0},", item);
            }

            if (ret.EndsWith(","))
            {
                ret = ret.Substring(0, ret.Length - 1);
            }
        }

        return ret;
    }

    public static string ToCommaSeparatedList(this List<int> items)
    {
        string ret = string.Empty;

        if (items != null)
        {

            foreach (var item in items)
            {
                ret += string.Format("{0},", item);
            }

            if (ret.EndsWith(","))
            {
                ret = ret.Substring(0, ret.Length - 1);
            }
        }

        return ret;
    }

    public static string ToCommaSeparatedList(this List<string> items)
    {
        string ret = string.Empty;

        if (items != null)
        {

            foreach (var item in items)
            {
                ret += string.Format("{0},", item);
            }

            if (ret.EndsWith(","))
            {
                ret = ret.Substring(0, ret.Length - 1);
            }
        }

        return ret;
    }

    public static List<string> ReadLines(this string str)
    {
        var items = str.Split("\n").ToList();
        return items.Where(x => x != null && x.Trim() != string.Empty).ToList();
    }

    public static bool HasValidID(this int? val)
    {
        return val != null && val > 0;
    }

    public static bool HasValidID(this int val)
    {
        return val > 0;
    }

    public static int[] GetIntArrayFromCommaSeparatedString(this string str)
    {
        if (string.IsNullOrEmpty(str))
        {
            return new int[0];
        }
        var idStrings = str.Split(',');
        List<int> ids = new List<int>();
        foreach (var s in idStrings)
        {
            ids.Add(int.Parse(s));
        }

        return ids.ToArray();
    }

    public static decimal[] GetDecimalArrayFromField(this IList list, string name)
    {

        if (list.Count > 0)
        {
            var type = list[0].GetType();

            var property = type.GetProperty(name);
            List<decimal> values = new List<decimal>();

            if (property != null)
            {
                foreach (var item in list)
                {
                    var value = property.GetValue(item);
                    if (value != null)
                    {
                        try
                        {
                            values.Add((decimal)value);
                        }
                        catch (Exception ex)
                        {
                            throw new ApplicationException(string.Format("Cannot add value {0} for Name {1}", value, name));
                        }
                    }
                    else
                    {
                        values.Add(0);
                    }
                }
            }

            return values.ToArray();
        }
        else
        {
            return new decimal[] { };
        }
    }

    public static string[] GetStringArrayFromField<T>(this List<T> list, string name)
    {

        var type = typeof(T);

        var property = type.GetProperty(name);
        List<string> values = new List<string>();

        if (property != null)
        {
            foreach (var item in list)
            {
                var value = property.GetValue(item);
                values.Add(value.ToString());
            }
        }

        return values.ToArray();
    }

    public static string[] GetStringArrayFromField(this IList list, string name)
    {
        if (list.Count > 0)
        {
            var type = list[0].GetType();

            var property = type.GetProperty(name);
            List<string> values = new List<string>();

            if (property != null)
            {
                foreach (var item in list)
                {
                    var value = property.GetValue(item);
                    if (value != null)
                    {
                        values.Add(value.ToString());
                    }
                }
            }

            return values.ToArray();
        }
        else
        {
            return new string[] { };
        }

    }

    //MM: I added this, it a copy of the original one, only difference is the nullable
    public static string ToCommaSeparatedList2(this int?[] items)
    {
        string ret = string.Empty;

        if (items != null)
        {

            foreach (var item in items)
            {
                ret += string.Format("{0},", item);
            }

            if (ret.EndsWith(","))
            {
                ret = ret.Substring(0, ret.Length - 1);
            }
        }

        return ret;
    }

    public static string RemoveStopWords(this string input)
    {
        // Define a list of common stop words in English
        string[] stopWords = { "i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours",
                               "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers",
                               "herself", "it", "its", "itself", "they", "them", "their", "theirs", "themselves",
                               "what", "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are",
                               "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does",
                               "did", "doing", "a", "an", "the", "and", "but", "if", "or", "because", "as", "until",
                               "while", "of", "at", "by", "for", "with", "about", "against", "between", "into",
                               "through", "during", "before", "after", "above", "below", "to", "from", "up", "down",
                               "in", "out", "on", "off", "over", "under", "again", "further", "then", "once", "here",
                               "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more",
                               "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so",
                               "than", "too", "very", "s", "t", "can", "will", "just", "don", "should", "now" };

        // Create a regular expression pattern to match stop words
        string pattern = @"\b(?:" + string.Join("|", stopWords.Select(Regex.Escape)) + @")\b";

        // Remove stop words from the input string
        string result = Regex.Replace(input, pattern, string.Empty, RegexOptions.IgnoreCase);

        // Remove extra spaces and trim the result
        result = Regex.Replace(result, @"\s+", " ").Trim();

        return result;
    }

    // public static byte[] FileToByteArray(this IFormFile file)
    // {
    //     //byte[] buffer = new byte[file.InputStream.Length];
    //     using (MemoryStream ms = new MemoryStream())
    //     {
    //         using (var memoryStream = new MemoryStream())
    //         {
    //             file.OpenReadStream().CopyTo(memoryStream);
    //             return memoryStream.ToArray();
    //         }
    //     }
    // }

    /// <summary>
    /// MP: Validates int for dynamic queries.
    /// </summary>
    /// <param name="num"></param>
    /// <returns></returns>
    public static bool IsNotNullZero(this int num)
    {
        return (num != 0 && num != null);
    }

    /// <summary>
    /// MP: Validates int for dynamic queries.
    /// </summary>
    /// <param name="num"></param>
    /// <returns></returns>
    public static bool IsNotNullZero(this int? num)
    {
        return (num != 0 && num != null);
    }

}
