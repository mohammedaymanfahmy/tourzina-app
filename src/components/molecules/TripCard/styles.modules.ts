import { StyleSheet } from 'react-native';
import { wp, hp } from '@/utils/dimensions';
import colors from '@/colors/colors';

const styles = StyleSheet.create({

  vCard: { width: wp(154) },
  vImage: {
    width: wp(154),
    height: hp(220),
    borderRadius: 15,
    padding:10,
    margin: 10,
  },
  vTopRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  vRating: { position: 'absolute', left: 10, bottom: hp(64) },
  vFooter: { flex: 1, justifyContent: 'flex-end' },

  tripName: { fontSize: 16, fontWeight: 'bold', color: colors.white },
  tripLocation: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  tripLocationText: { fontSize: 12, color: colors.white },

  hContainer: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, gap: 12, position: 'relative' },
  leftContainer: { flex: 1, flexDirection: 'row', gap: 12, alignItems: 'center' },
  rightContainer: { paddingHorizontal: 6, alignSelf: 'flex-start' },
  hTripInfo: { flex: 1, justifyContent: 'space-between' },
  divider: { position: 'absolute', left: 0, right: 0, bottom: 0, height: StyleSheet.hairlineWidth, backgroundColor: colors.lineDark },


  lgCard: { gap: 12 },
  lgImage: { width: wp(355), height: hp(180), borderRadius: 16, overflow:'hidden', padding: 10 },
  lgRating: { position: 'absolute', left: 10, bottom: 10 },
  lgFooter: { paddingHorizontal:4, gap: 4 },
  lgTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
});

export default styles;